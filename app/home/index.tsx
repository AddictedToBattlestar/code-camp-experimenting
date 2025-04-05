import {StyleSheet, Text, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/chat/Body';
import Footer from '@/app/components/chat/Footer';
import React, {useCallback, useEffect, useState} from "react";
import {Href, useFocusEffect, useNavigation, useRouter} from "expo-router";
import MessageType from "@/app/objects/MessageType";

import useFirebaseMessages from "@/app/hooks/useFirebaseMessages";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import useUserKeyInLocalStorage from "@/app/hooks/useUserKeyInLocalStorage";
import UserData from "@/app/objects/UserData";
import UserButtonIcon from "@/app/components/button-icons/UserButtonIcon";

// "Index" is a reserved name to indicate the default route to present in the application
// This will be providing the main chat screen for this project.
export default function Index() {
    const {userDataListing} = useFirebaseUserData();
    const {messages, storeMessage} = useFirebaseMessages();
    const {userKeyInLocalStorage} = useUserKeyInLocalStorage();
    const [currentUserData, setCurrentUserData] = useState<UserData>();

    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        console.log('home.useEffect: userKeyFromLocalStorage', userKeyInLocalStorage);
        if (userKeyInLocalStorage === null) {
            const loginRoute = "/" as Href;
            router.replace(loginRoute);
        } else if (userKeyInLocalStorage && userDataListing) {
            setCurrentUserData(userDataListing.get(userKeyInLocalStorage))
        }
    })

    useFocusEffect(
        useCallback(() => {
            const profileRoute = '/home/profile' as Href;
            navigation.setOptions({
                headerRight: () => (
                    <UserButtonIcon
                        userName={currentUserData?.key}
                        userProfileImage={currentUserData?.profileImage}
                        handleOnPress={() => {
                            router.navigate(profileRoute);
                        }}
                        style={styles.profileButton}
                    />
                ),
            });
        }, [navigation])
    );

    if (!currentUserData) return (<View></View>);

    const localCreateNewMessage = (newMessageText: string, messageType: MessageType) => {
        storeMessage(currentUserData?.userName, newMessageText, messageType);
    };

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
