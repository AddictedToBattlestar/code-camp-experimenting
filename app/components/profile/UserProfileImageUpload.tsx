import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import * as ImagePicker from 'expo-image-picker';
import {Image} from 'expo-image';
import * as FileSystem from 'expo-file-system';

import {FontAwesome} from "@expo/vector-icons";
/*
Note: 
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "Ionicons")

The Expo Go <FontAwesome/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

Reference: https://docs.expo.dev/guides/icons/
*/

type Props = {
    userProfileImage: string | undefined | null;
    setUserProfileImage: (value: string) => void;
}
export default function UserImageUpload({userProfileImage, setUserProfileImage}: Readonly<Props>) {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(`Pushing new profile image`);
            setUserProfileImage(result.assets[0].uri);

            if (Platform.OS === 'web') {
                setUserProfileImage(result.assets[0].uri);
            } else {
                const base64Img = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType?.Base64 });
                setUserProfileImage("data:image/png;base64,"+base64Img);
            }
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <View>
            <Pressable
                style={styles.button} 
                onPress={pickImageAsync}
            >
                <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon}/>
                <Text style={styles.buttonText}>
                    {userProfileImage ? "Change your profile image" : "Choose a profile image"}
                </Text>
            </Pressable>

            <View style={styles.imageContainer}>
                {userProfileImage && <Image source={{uri: userProfileImage}} style={styles.image}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: "90%",
        height: 440,
        borderRadius: Constants.generic.borderRadius
    },
});