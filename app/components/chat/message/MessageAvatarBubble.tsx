import {StyleSheet, Text, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Image} from 'expo-image';
import React from "react";

type Props = {
    who: string;
    userProfileImage: string | undefined;
}
export default function MessageAvatarBubble({who, userProfileImage}: Readonly<Props>) {
    function findFirstTwoUpper(text: string) {
        const upperLetters = [];
        for (const element of text) {
            if (element === element.toUpperCase() && RegExp(/[A-Z]/).exec(element)) {
                upperLetters.push(element);
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
                {userProfileImage ? (
                    <Image source={{uri: userProfileImage}} style={styles.image}/>
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
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: GreyScaleColorScheme[4],
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
