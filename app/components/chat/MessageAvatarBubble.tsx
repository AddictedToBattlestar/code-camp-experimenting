import {StyleSheet, Text, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Image, type ImageSource} from 'expo-image';
import React from "react";

type Props = {
    who: string;
    userImage: ImageSource | null;
}

export default function MessageAvatarBubble({who, userImage}: Props) {
    function findFirstTwoUpper(text: string) {
        const upperLetters = [];
        for (let i = 0; i < text.length; i++) {
            if (text[i] === text[i].toUpperCase() && text[i].match(/[A-Z]/)) {
                upperLetters.push(text[i]);
                if (upperLetters.length === 2) {
                    break;
                }
            }
        }
        return upperLetters.length === 2 ? upperLetters : text[0];
    }

    const initialsToDisplay = findFirstTwoUpper(who);

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                {userImage ? (
                    <Image source={userImage} style={styles.image}/>
                ) : (
                    <Text style={styles.text}>{initialsToDisplay}</Text>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column-reverse",
    },
    bubble: {
        width: 30,
        height: 30,
        borderRadius: 17,
        backgroundColor: GreyScaleColorScheme[5],
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
