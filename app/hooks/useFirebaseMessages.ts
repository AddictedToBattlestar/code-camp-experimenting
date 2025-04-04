import {useEffect, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import MessageType from "@/app/objects/MessageType";
import uuid from 'react-native-uuid';

import app from "@/firebaseConfig";
import {getDatabase, onValue, ref, set} from "firebase/database";

export default function useFirebaseMessages() {
    const pathName = 'messages';
    // in memory location for these messages
    const [messages, setMessages] = useState<MessageObject[]>([]);

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    const fetchData = () => {
        //TODO: need to look into .orderByChild("time").limitToLast(50)
        // Listen for changes in the collection
        onValue(collectionRef, (snapshot) => {
            const data = snapshot.val();

            // Check if dataItem exists
            if (data) {
                // Convert the object values into an array
                console.debug(`useFirebaseMessages.fetchData: ${Object.entries(data).length} items being kept in memory`);
                const rawData = Object.values(data).reverse();
                const messages = rawData.map((rawItem) => {
                    return new MessageObject(
                        // @ts-ignore
                        rawItem.key,
                        // @ts-ignore
                        rawItem.time,
                        // @ts-ignore
                        rawItem.who,
                        // @ts-ignore
                        rawItem.messageText,
                        // @ts-ignore
                        rawItem.messageType
                    );
                })
                setMessages(messages);
            }
        });
    };

    const storeMessage = (userName: string, newMessageText: string, messageType: MessageType) => {
        const newMessage = new MessageObject(uuid.v1().toString(), Date.now(), userName, newMessageText, messageType);
        console.debug(`useFirebaseMessages.storeMessage:`, newMessage);
        set(ref(database, `${pathName}/${newMessage.key}`), newMessage);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {messages, storeMessage}
}