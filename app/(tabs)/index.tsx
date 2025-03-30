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

export default function Index() {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.debug('This route is now focused');

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

    const [messages, setMessages] = useState<MessageObject[]>(InitialMessages);

    const createNewMessage = (newMessageText: string, messageType: MessageType) => {
        console.debug(`Creating new message (messageType: ${messageType}, messageText: "${messageType === MessageType.Text ? newMessageText : "-"}")`);
        const newMessage = new MessageObject(crypto.randomUUID(), userName, newMessageText, messageType);
        setMessages([newMessage, ...messages]);
    };

    const [userImages] = useState<Map<string, ImageData>>(InitialUserImages);

    return (
        <View
            style={styles.container}
        >
            <Header style={styles.chatHeader} text={"Technology Camp Chat"}/>
            <Body style={styles.chatBody} userNameForSelf={userName} messages={messages} userImages={userImages}/>
            <Footer style={styles.chatFooter} createNewMessage={createNewMessage}/>
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
