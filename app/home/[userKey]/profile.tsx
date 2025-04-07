import {Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import {Href, useLocalSearchParams, useRouter} from "expo-router";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserProfileImageUpload from "@/app/components/profile/UserProfileImageUpload";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import { useHeaderHeight } from "@react-navigation/elements";
import useLocalStorage from "@/app/hooks/useLocalStorage";

export default function Profile() {
    const { userKey } = useLocalSearchParams();
    const {userDataForSelf, storeUserData} = useFirebaseUserData(userKey);
    const [userName, setUserName] = useState<string>("")
    const [profileImage, setProfileImage] = useState<string>()
    const router = useRouter();
    const headerHeight = useHeaderHeight()
    const [userKeyInLocalStorage, setUserKeyInLocalStorage] = useLocalStorage('userKey');

    useEffect(() => {
        if (!userKey) {
            const loginRoute = "/" as Href;
            router.replace(loginRoute);
        } else if (userDataForSelf) {
            setUserName(userDataForSelf.userName);
            setProfileImage(userDataForSelf.profileImage);
        }
    }, [userDataForSelf]);

    if (!userDataForSelf) {
        return (
            <View>
                <Text>Data loading...</Text>
            </View>
        );
    }

    const saveChanges =  async () => {
        userDataForSelf.userName = userName;
        userDataForSelf.profileImage = profileImage;
        storeUserData(userDataForSelf);
        if (router.canGoBack()) {
            router.back();
        } else {
            const homeRoute = `/home/${userKey}/chat` as Href;
            router.replace(homeRoute);
        }
    };

    const logout = async () => {
        await setUserKeyInLocalStorage(null);
        const loginRoute = "/" as Href;
        router.replace(loginRoute);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.keyboardContainer}
            keyboardVerticalOffset={headerHeight}
        >
            <Pressable onPress={Keyboard.dismiss} style={styles.keyboardContainer}>
                <View style={styles.innerContainer}>
                    <UserNameInput userName={userName} setUserName={setUserName} />
                    <UserProfileImageUpload userProfileImage={profileImage} setUserProfileImage={setProfileImage}/>
                    <Pressable style={styles.saveChangesButton} onPress={saveChanges}>
                        <Text>Save changes</Text>
                    </Pressable>
                    <Pressable style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutButtonText}>Log out</Text>
                    </Pressable>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: Colors.default.backgroundColor,
        color: Colors.default.color,
        paddingLeft: Constants.generic.padding,
        paddingRight: Constants.generic.padding,
        gap: Constants.generic.padding
    },
    saveChangesButton: {
        height: 60,
        backgroundColor: Colors.default.primaryColor,
        borderColor: Colors.default.color,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: Colors.dangerColor,
        borderColor: Colors.default.color,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        display: "flex",
        alignItems: "center",
    },
    logoutButtonText: {
        color: GreyScaleColorScheme[0],
    }
});
