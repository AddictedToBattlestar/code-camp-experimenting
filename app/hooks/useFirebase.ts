import {useCallback, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import {useFocusEffect} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import uuid from 'react-native-uuid';

import app from "@/firebaseConfig";
import {getDatabase, onValue, ref, set} from "firebase/database";

export default function useFirebase() {
    const pathName = 'messages';
    // messages: loaded from local data and kept in memory
    const [messages, setMessages] = useState<MessageObject[]>([]);

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    // Function to fetch data from the database
    const fetchData = () => {

        //TODO: need to look into .orderByChild("time").limitToLast(50)
        // Listen for changes in the collection
        onValue(collectionRef, (snapshot) => {
            const dataItem = snapshot.val();

            // Check if dataItem exists
            if (dataItem) {
                // Convert the object values into an array
                const rawMessages = Object.values(dataItem).reverse();
                const messages = rawMessages.map((rawMessage) => {
                    return new MessageObject(
                        // @ts-ignore
                        rawMessage.key,
                        // @ts-ignore
                        rawMessage.time,
                        // @ts-ignore
                        rawMessage.who,
                        // @ts-ignore
                        rawMessage.messageText,
                        // @ts-ignore
                        rawMessage.messageType
                    );
                })
                setMessages(messages);
            }
        });
    };

    const createNewMessage = (userName: string, newMessageText: string, messageType: MessageType) => {
        const newMessage = new MessageObject(uuid.v1().toString(), Date.now(), userName, newMessageText, messageType);
        console.debug('Creating a new message', newMessage);
        set(ref(database, `${pathName}/${newMessage.key}`), newMessage);
    };

    useFocusEffect(
        useCallback(() => {
            // Fetch data when the component mounts
            fetchData();
            return () => {
            };
        }, [])
    );

    return {messages, createNewMessage}
}