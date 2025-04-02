import {StyleSheet, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserProfileImageUpload from "@/app/components/profile/UserProfileImageUpload";

export default function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <UserNameInput/>
                <UserProfileImageUpload/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.backgroundColor,
        color: Colors.default.color
    },
    body: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
        gap: 10
    },
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