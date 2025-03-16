import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

export default function UserImageUpload() {
    return (
        <View>
            <Pressable
                style={styles.imageUploadButton}
                onPress={() => console.log('You pressed the choose an image button.')}>
                <Text style={styles.imageUploadButtonText}>Choose a profile image</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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