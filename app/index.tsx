import {Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import React, {useCallback, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import {InitialMessages} from "@/constants/InitialMessages";
import {InitialUserImages} from "@/constants/InitialUserImages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation, useRouter} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import ImageData from "@/app/objects/ImageData";
import uuid from 'react-native-uuid';

// "Index" is a reserved name to indicate the default route to present in the application
// This will be providing the main chat screen for this project.
export default function Index() {
    const navigation = useNavigation();
    const router = useRouter();
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

            navigation.setOptions({
                headerRight: () => (
                    <Pressable onPress={() => router.navigate('/profile')}>
                        <Text>Profile</Text>
                    </Pressable>
                ),
            });

            getUserName().then((value) => {
                if (value !== null) {
                    setUserName(value);
                }
            });
            return () => {
                console.debug('This route is now unfocused.');
            };
        }, [navigation])
    );

    const [messages, setMessages] = useState<MessageObject[]>(InitialMessages);

    const createNewMessage = (newMessageText: string, messageType: MessageType) => {
        console.debug(`Creating new message (messageType: ${messageType}, messageText: "${messageType === MessageType.Text ? newMessageText : "-"}")`);
        const newMessage = new MessageObject(uuid.v1().toString(), userName, newMessageText, messageType);
        setMessages([newMessage, ...messages]);
    };

    const [userImages] = useState<Map<string, ImageData>>(InitialUserImages);

    return (
        <View style={styles.container}>
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
        color: Colors.default.color,
        marginBottom: 30
    },
    chatBody: {
        width: '100%',
        padding: Constants.generic.padding,
    },
    chatFooter: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.backgroundColor
    }
});
