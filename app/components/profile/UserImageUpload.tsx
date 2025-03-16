import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import * as ImagePicker from 'expo-image-picker';

import {Image} from 'expo-image';
import {FontAwesome} from "@expo/vector-icons";

const PlaceholderImage = require('@/assets/images/react-logo.png');

export default function UserImageUpload() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
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
                <Text
                    style={styles.buttonText}>{selectedImage ? "Change your profile image" : "Choose a profile image"}</Text>
            </Pressable>

            <View style={styles.imageContainer}>
                <Image source={selectedImage ? {uri: selectedImage} : PlaceholderImage} style={styles.image}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        // width: 250,
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
    buttonIcon: {
        paddingRight: 8,
    },
    buttonText: {
        color: Colors.default.backgroundColor,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});