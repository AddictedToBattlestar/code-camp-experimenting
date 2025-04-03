import {Pressable, StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import React, {useCallback, useState} from "react";
import InitialUserProfileImages from "@/constants/InitialUserProfileImages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation, useRouter} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import ImageData from "@/app/objects/ImageData";
import Ionicons from "@expo/vector-icons/Ionicons";

import SetupFirebaseMessages from "./utilities/SetupFirebaseMessages";

// "Index" is a reserved name to indicate the default route to present in the application
// This will be providing the main chat screen for this project.
export default function Index() {
    // userName: via AsyncStorage
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    const {messages, createNewMessage} = SetupFirebaseMessages();

    const localCreateNewMessage = (newMessageText: string, messageType: MessageType) => {
        createNewMessage(userName, newMessageText, messageType);
    };

    // userProfileImages: loaded from local data
    const [userProfileImages] = useState<Map<string, ImageData>>(InitialUserProfileImages);

    const navigation = useNavigation();
    const router = useRouter();
    useFocusEffect(
        useCallback(() => {
            console.debug('This route is now focused');

            navigation.setOptions({
                headerRight: () => (
                    <Pressable onPress={() => router.navigate('/profile')} style={styles.profileButton}>
                        <Ionicons name="person" size={18}/>
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

    return (
        <View style={styles.container}>
            <Body style={styles.chatBody} userNameForSelf={userName} messages={messages} userProfileImages={userProfileImages}/>
            <Footer style={styles.chatFooter} createNewMessage={localCreateNewMessage}/>
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
    profileButton: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: Colors.default.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
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
