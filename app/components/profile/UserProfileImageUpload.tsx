import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import * as ImagePicker from 'expo-image-picker';
import {Image} from 'expo-image';
import InitialUserProfileImages from "@/constants/InitialUserProfileImages";
import ImageData from "@/app/objects/ImageData";

import {FontAwesome} from "@expo/vector-icons";
/*
Note: 
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "Ionicons")

The Expo Go <FontAwesome/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

Reference: https://docs.expo.dev/guides/icons/
*/

import AsyncStorage from '@react-native-async-storage/async-storage';
// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/

export default function UserImageUpload() {
    // userName: via AsyncStorage
    const [userName, setUserName] = useState<string>('');
    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    // userProfileImages: loaded from local data
    const [userProfileImages, setUserProfileImages] = useState<Map<string, ImageData>>(InitialUserProfileImages);

    const storeUserImage = async (value: string) => {
        try {
            await AsyncStorage.setItem('userImage', value);
            console.log('userImage pushed to AsyncStorage', value);
        } catch (e) {
            console.error(`There was a problem setting userImage`, e);
            alert(`There was a problem setting userImage`);
        }
    };

    // currentUserProfileImage
    const [currentUserProfileImage, setCurrentUserProfileImage] = useState<ImageData | null | undefined>(null);

    const getUserProfileImage = (userName: string): ImageData | null | undefined => {
        if (userName) {
            return userProfileImages.get(userName);
        } else {
            return null;
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            const imageData = new ImageData(result.assets[0].uri);
            setCurrentUserProfileImage(imageData);
            userProfileImages.set(userName, imageData);
        } else {
            alert('You did not select any image.');
        }
    };


    useEffect(() => {
        getUserName().then((userNameValue) => {
            if (userNameValue !== null) {
                setUserName(userNameValue);
                const currentUserProfileImageValue = getUserProfileImage(userNameValue);
                setCurrentUserProfileImage(currentUserProfileImageValue);
            }
        });
    }, []);

    return (
        <View>
            <Pressable
                style={styles.button} onPress={pickImageAsync}>
                <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon}/>
                <Text style={styles.buttonText}>
                    {currentUserProfileImage ? "Change your profile image" : "Choose a profile image"}
                </Text>
            </Pressable>

            <View style={styles.imageContainer}>
                {currentUserProfileImage && <Image source={{uri: currentUserProfileImage?.uri}} style={styles.image}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 35,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.color,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: Constants.generic.padding,
    },
    buttonIcon: {
        paddingRight: Constants.generic.padding,
        color: Colors.default.backgroundColor
    },
    buttonText: {
        color: Colors.default.backgroundColor,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});