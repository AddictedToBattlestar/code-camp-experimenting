import {StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserProfileImageUpload from "@/app/components/profile/UserProfileImageUpload";
import InitialUserProfileImages from "@/constants/InitialUserProfileImages";
import ImageData from "@/app/objects/ImageData";

import AsyncStorage from '@react-native-async-storage/async-storage';
// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/

export default function Profile() {
    // userName: via AsyncStorage
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    const localSetUserName = async (value: string) => {
        console.log(`setting user name: ${value}`);
        setUserName(value);
        if (!userProfileImage) {
            setUserProfileImageFromUserName(value);
        }
        await storeUserName(value);
    }

    const storeUserName = async (value: string) => {
        setUserName(value);
        try {
            await AsyncStorage.setItem('userName', value);
        } catch (e) {
            console.error(`There was a problem setting userName: ${userName}`, e);
            alert(`There was a problem setting userName: ${userName}`);
        }
    };

    // userProfileImages: loaded from local data
    const [userProfileImages, setUserProfileImages] = useState<Map<string, ImageData>>(InitialUserProfileImages);

    // userProfileImage: profile image for the current user
    const [userProfileImage, setUserProfileImage] = useState<string | undefined | null>(null);

    const updateUserProfileImage = (value: string) => {
        setUserProfileImage(value);

        const localUserProfileImage = new ImageData(value);
        const localUserProfileImages = userProfileImages.set(userName, localUserProfileImage);
        setUserProfileImages(localUserProfileImages);
        console.log(`userProfileImages.keys:`, Array.from(userProfileImages.keys()));
    }

    const setUserProfileImageFromUserName = (userName: string) => {
        const currentUserProfileImageValue = userProfileImages.get(userName);
        if (currentUserProfileImageValue) {
            console.log(`userProfileImage located`);
            setUserProfileImage(currentUserProfileImageValue.uri)
        } else {
            setUserProfileImage(null);
        }
    };

    useEffect(() => {
        console.log(`userProfileImages.keys:`, Array.from(userProfileImages.keys()));
        getUserName().then((userNameValue) => {
            console.log(`userName: ${userNameValue}`);
            if (userNameValue !== null) {
                setUserName(userNameValue);
                setUserProfileImageFromUserName(userNameValue);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <UserNameInput userName={userName} setUserName={localSetUserName}/>
                <UserProfileImageUpload userProfileImage={userProfileImage} updateUserProfileImage={updateUserProfileImage}/>
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
    }
});