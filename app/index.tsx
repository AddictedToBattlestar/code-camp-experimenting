import {Pressable, StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import React, {useCallback, useState} from "react";
import MessageObject from "@/app/objects/MessageObject";
import InitialMessages from "@/constants/InitialMessages";
import InitialUserProfileImages from "@/constants/InitialUserProfileImages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation, useRouter} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import ImageData from "@/app/objects/ImageData";
import uuid from 'react-native-uuid';
import Ionicons from "@expo/vector-icons/Ionicons";

import app from "@/firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";

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

    const createNewMessageFirebase = (newMessageText: string, messageType: MessageType) => {
        const newMessage = new MessageObject(uuid.v1().toString(), Date.now(), userName, newMessageText, messageType);
        console.debug('Creating a new message', newMessage);
        set(ref(database, `tech_camp_chat/${newMessage.key}`), newMessage);
    };


    // userProfileImages: loaded from local data
    const [userProfileImages] = useState<Map<string, ImageData>>(InitialUserProfileImages);

    const navigation = useNavigation();
    const router = useRouter();
    useFocusEffect(
        useCallback(() => {
            console.debug('This route is now focused');

            // Fetch data when the component mounts
            fetchData();

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
