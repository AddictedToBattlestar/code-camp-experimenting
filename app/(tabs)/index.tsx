import {StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import Header from '@/app/components/Header';
import {useCallback, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import {InitialMessages} from "@/constants/InitialMessages";
import {InitialUserImages} from "@/constants/InitialUserImages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import ImageData from "@/app/objects/ImageData";

import app from "@/firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";
import uuid from 'react-native-uuid';

export default function Index() {
    const [userImages] = useState<Map<string, ImageData>>(InitialUserImages);
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    const [messages, setMessages] = useState<MessageObject[]>([]);

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, 'tech_camp_chat');

    // Function to fetch data from the database
    const fetchData = () => {
        // Listen for changes in the collection
        //TODO: need to look into .orderByChild("time").limitToLast(50)
        onValue(collectionRef, (snapshot) => {
          const dataItem = snapshot.val();
          console.log('dataItem', dataItem);

          // Check if dataItem exists
          if (dataItem) {
            // Convert the object values into an array
            const rawMessages = Object.values(dataItem).reverse();
            const messages = rawMessages.map((value) => {
                const message = new MessageObject(
                    value._key,
                    value._time,
                    value._who,
                    value._messageText,
                    value._messageType
                );
                return message;
            })
            setMessages(messages);
          }
        });
      };

    const createNewMessage = (newMessageText: string, messageType: MessageType) => {
        console.debug(`Creating new message (messageType: ${messageType}, messageText: "${messageType === MessageType.Text ? newMessageText : "-"}")`);
        const newMessage = new MessageObject(uuid.v1().toString(), Date.now(), userName, newMessageText, messageType);
        setMessages([newMessage, ...messages]);
    };

    const createNewMessageFirebase = (newMessageText: string, messageType: MessageType) => {
        console.debug(`Creating new message (messageType: ${messageType}, messageText: "${messageType === MessageType.Text ? newMessageText : "-"}")`);
        const newMessage = new MessageObject(uuid.v1().toString(), Date.now(), userName, newMessageText, messageType);
        set(ref(database, `tech_camp_chat/${newMessage.key}`), newMessage);
    };

    useFocusEffect(
        useCallback(() => {
            console.debug('This route is now focused');

            // Fetch data when the component mounts
            fetchData();

            getUserName().then((value) => {
                if (value !== null) {
                    setUserName(value);
                    console.debug(`userName: ${value}`);
                }
            });
            return () => {
                console.debug('This route is now unfocused.');
            };
        }, [])
    );

    return (
        <View
            style={styles.container}
        >
            <Header style={styles.chatHeader} text={"Technology Camp Chat"}/>
            <Body style={styles.chatBody} userNameForSelf={userName} messages={messages} userImages={userImages}/>
            <Footer style={styles.chatFooter} createNewMessage={createNewMessageFirebase}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.backgroundColor,
        color: Colors.default.color
    },
    chatHeader: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.primaryColor,
        color: Colors.default.color
    },
    chatBody: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
    },
    chatFooter: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.backgroundColor
    }
});
