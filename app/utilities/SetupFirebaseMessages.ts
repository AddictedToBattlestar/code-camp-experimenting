import {useCallback, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import {useFocusEffect} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import uuid from 'react-native-uuid';

import app from "@/firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";

export default function SetupFirebaseMessages() {
    // messages: loaded from local data and kept in memory
    const [messages, setMessages] = useState<MessageObject[]>([]);

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, 'tech_camp_chat');

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
                const message = new MessageObject(
                    rawMessage.key,
                    rawMessage.time,
                    rawMessage.who,
                    rawMessage.messageText,
                    rawMessage.messageType
                );
                return message;
            })
            setMessages(messages);
          }
        });
      };

    const createNewMessage = (userName: string, newMessageText: string, messageType: MessageType) => {
        const newMessage = new MessageObject(uuid.v1().toString(), Date.now(), userName, newMessageText, messageType);
        console.debug('Creating a new message', newMessage);
        set(ref(database, `tech_camp_chat/${newMessage.key}`), newMessage);
    };

    useFocusEffect(
        useCallback(() => {
            console.debug('Fetching messaging data');

            // Fetch data when the component mounts
            fetchData();
            return () => {};
        }, [])
    );

    return {messages, createNewMessage}
}