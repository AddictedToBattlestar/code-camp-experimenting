import {StyleSheet, Text, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import React, {useCallback, useEffect, useState} from "react";
import {Href, useFocusEffect, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import MessageType from "@/app/objects/MessageType";

import useFirebaseMessages from "@/app/hooks/useFirebaseMessages";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import UserButtonIcon from "@/app/components/button-icons/UserButtonIcon";

// "Index" is a reserved name to indicate the default route to present in the application
// This will be providing the main chat screen for this project.
export default function Chat() {
    const { userKey } = useLocalSearchParams();
    const {userDataForSelf, userDataListing} = useFirebaseUserData(userKey);
    const {messages, storeMessage} = useFirebaseMessages();

    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        console.debug('chat.useEffect: userDataForSelf', userDataForSelf);

        if (userDataForSelf === null) {
            const loginRoute = "/" as Href;
            router.replace(loginRoute);
        }
    }, [userDataForSelf])

    useFocusEffect(
        useCallback(() => {
            const profileRoute = `/home/${userKey}/profile` as Href;
            navigation.setOptions({
                headerRight: () => (
                    <UserButtonIcon
                        userName={userDataForSelf?.key}
                        userProfileImage={userDataForSelf?.profileImage}
                        handleOnPress={() => {
                            router.navigate(profileRoute);
                        }}
                        style={styles.profileButton}
                    />
                ),
            });
        }, [navigation, userDataForSelf])
    );

    if (!userDataForSelf || !messages) {
        return (
            <View>
                <Text>Data loading...</Text>
            </View>
        );
    }

    const localCreateNewMessage = (newMessageText: string, messageType: MessageType) => {
        storeMessage(userDataForSelf?.key, newMessageText, messageType);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={{color: GreyScaleColorScheme[4]}}>Username: {userDataForSelf.userName}</Text>
            </View>
            <Body style={styles.chatBody} userDataForSelf={userDataForSelf} messages={messages}
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
        backgroundColor: Colors.default.backgroundColor,
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
