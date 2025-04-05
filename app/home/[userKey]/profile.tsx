import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import {Href, useLocalSearchParams, useRouter} from "expo-router";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserProfileImageUpload from "@/app/components/profile/UserProfileImageUpload";

import useUserKeyInLocalStorage from "@/app/hooks/useUserKeyInLocalStorage";
import UserData from "@/app/objects/UserData";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";

export default function Profile() {
    const { userKey } = useLocalSearchParams();
    const {currentUserData} = useFirebaseUserData(userKey);
    const [userName, setUserName] = useState<string>("")
    const [profileImage, setProfileImage] = useState<string>()

    const router = useRouter();
    useEffect(() => {
        console.debug("profile.useEffect: currentUserData", currentUserData);

        if (!userKey) {
            const loginRoute = "/" as Href;
            router.replace(loginRoute);
        } else if (currentUserData) {
            setUserName(currentUserData.userName);
            setProfileImage(currentUserData.profileImage);
        }
    }, [currentUserData]);

    if (!currentUserData) {
        return (
            <View>
                <Text>Data loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <UserNameInput userName={userName} setUserName={setUserName} />
                <UserProfileImageUpload userProfileImage={profileImage} updateUserProfileImage={setProfileImage}/>
            </View>
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
    body: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
        gap: 10
    },
    imageUploadButton: {
        width: 200,
        height: 35,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.color,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    imageUploadButtonText: {
        color: Colors.default.backgroundColor,
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
    }
});
