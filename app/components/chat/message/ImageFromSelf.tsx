import {Image, StyleSheet, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors} from "@/constants/Colors";
import React from "react";

type Props = {
    content: string;
}
export default function MessageFromSelf({content}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Image source={{uri: content}} style={[styles.messageTextContainer, styles.imageContainer]}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Constants.generic.padding,
        display: "flex",
        flexDirection: "row-reverse",
    },
    messageContainer: {
        flexBasis: '80%',
    },
    messageTextContainer: {
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.primaryColor,
        color: Colors.default.color
    },
    imageContainer: {
        height: 200,
    }
})
