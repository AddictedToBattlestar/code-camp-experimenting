import {Image, StyleSheet, Text, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import UserButtonIcon from "@/app/components/button-icons/UserButtonIcon";
import React from "react";

type Props = {
    content: string;
    who: string;
    userProfileImage: string | undefined;
}
export default function ImageFromSomeoneElse({content, who, userProfileImage}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <UserButtonIcon userName={who} userProfileImage={userProfileImage}/>
            <View style={styles.messageContainer}>
                <Text style={styles.whoText}>{who}</Text>
                <Image source={{uri: content}} style={[styles.messageTextContainer, styles.imageContainer]}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Constants.generic.padding,
        display: "flex",
        flexDirection: "row",
        gap: Constants.generic.padding,
    },
    messageContainer: {
        flexBasis: '80%',
    },
    whoText: {
        color: GreyScaleColorScheme[4]
    },
    messageTextContainer: {
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.tintColor,
        color: Colors.default.color
    },
    imageContainer: {
        height: 200,
    }
});
