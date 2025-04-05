import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Image} from 'expo-image';
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    userName: string | undefined;
    userProfileImage: string | undefined;
    handleOnPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
export default function UserButtonIcon({userName, userProfileImage, handleOnPress, style}: Readonly<Props>) {
    const localHandleOnPress = () => {
        console.log("UserButtonIcon handleOnPress");
        if (handleOnPress) handleOnPress();
    }

    if (userProfileImage) {
        return (
            <Pressable style={[styles.button, style]} onPress={localHandleOnPress}>
                <Image source={{uri: userProfileImage}} style={styles.image}/>
            </Pressable>
        )
    }

    const initialsToDisplay = userName ? findFirstTwoUpperCharacters(userName) : null;
    if (initialsToDisplay) {
        return (
            <Pressable style={[styles.button, style]} onPress={localHandleOnPress}>
                <Text style={styles.text}>{initialsToDisplay}</Text>
            </Pressable>
        );
    } else {
        return (
            <Pressable style={[styles.button, style]} onPress={localHandleOnPress}>
                <Ionicons name="person" size={18}/>
            </Pressable>
        );
    }
}

const findFirstTwoUpperCharacters = (text: string)=> {
    const upperLetters = [];
    for (const element of text) {
        if (RegExp(/[A-Z]/).exec(element)) {
            upperLetters.push(element);
            if (upperLetters.length === 2) {
                break;
            }
        }
    }
    return upperLetters.length === 2 ? upperLetters : null;
};

const styles = StyleSheet.create({
    button: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: Colors.default.tintColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        color: Colors.default.color,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 17,
    }
});
