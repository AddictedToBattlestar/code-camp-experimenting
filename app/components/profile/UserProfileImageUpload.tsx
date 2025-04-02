import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import * as ImagePicker from 'expo-image-picker';
import {Image} from 'expo-image';

import {FontAwesome} from "@expo/vector-icons";
/*
Note: 
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "Ionicons")

The Expo Go <FontAwesome/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

Reference: https://docs.expo.dev/guides/icons/
*/

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserImageUpload() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        getUserImage().then((value) => {
            if (value !== null) {
                setSelectedImage(value);
            }
        });
    }, []);

    const getUserImage = async () => {
        try {
            return await AsyncStorage.getItem('userImage');
        } catch (ignoredError) {
            return null;
        }
    };

    const storeUserImage = async (value: string) => {
        try {
            await AsyncStorage.setItem('userImage', value);
            console.log('userImage pushed to AsyncStorage', value);
        } catch (e) {
            console.error(`There was a problem setting userImage`, e);
            alert(`There was a problem setting userImage`);
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            await storeUserImage(result.assets[0].uri);
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <View>
            <Pressable
                style={styles.button} onPress={pickImageAsync}>
                <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon}/>
                <Text style={styles.buttonText}>
                    {selectedImage ? "Change your profile image" : "Choose a profile image"}
                </Text>
            </Pressable>

            <View style={styles.imageContainer}>
                {selectedImage && <Image source={{uri: selectedImage}} style={styles.image}/>}
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