import {Pressable, StyleSheet, Text, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import React, {useCallback, useEffect, useState} from "react";
import {Href, useFocusEffect, useNavigation, useRouter} from "expo-router";
import MessageType from "@/app/objects/MessageType";
import Ionicons from "@expo/vector-icons/Ionicons";

import useFirebaseMessages from "@/app/hooks/useFirebaseMessages";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import useLocalUserKeyStorage from "@/app/hooks/useLocalUserKeyStorage";
import UserData from "@/app/objects/UserData";

// "Index" is a reserved name to indicate the default route to present in the application
// This will be providing the main chat screen for this project.
export default function Index() {
    const {userDataListing} = useFirebaseUserData();
    const {messages, storeMessage} = useFirebaseMessages();
    const {userKeyFromLocalStorage} = useLocalUserKeyStorage();
    const [currentUserData, setCurrentUserData] = useState<UserData>()

    const localCreateNewMessage = (newMessageText: string, messageType: MessageType) => {
        storeMessage(userKeyFromLocalStorage, newMessageText, messageType);
    };

    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        if (userKeyFromLocalStorage === null) {
            router.replace("/"); // Go to login if user is not found
        } else if (userKeyFromLocalStorage && userDataListing) {
            setCurrentUserData(userDataListing.get(userKeyFromLocalStorage))
        }
    })

    useFocusEffect(
        useCallback(() => {
            const profileRoute = '/home/profile' as Href;
            navigation.setOptions({
                headerRight: () => (
                    <Pressable onPress={() => router.navigate(profileRoute)} style={styles.profileButton}>
                        <Ionicons name="person" size={18}/>
                    </Pressable>
                ),
            });
        }, [navigation])
    );

    if (!currentUserData) return (<View></View>);

    return (
        <View style={styles.container}>
            <View>
                <Text style={{color: GreyScaleColorScheme[4]}}>Username: {currentUserData.userName}</Text>
            </View>
            <Body style={styles.chatBody} userNameForSelf={currentUserData.userName} messages={messages}
                  userDataListing={userDataListing}/>
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
        paddingLeft: Constants.generic.padding,
        paddingRight: Constants.generic.padding,
    },
    chatFooter: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.backgroundColor
    }
});
