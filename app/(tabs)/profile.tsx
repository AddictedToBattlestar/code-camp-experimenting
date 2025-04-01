import {StyleSheet, View} from "react-native";
import Header from "@/app/components/Header";
import React from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserImageUpload from "@/app/components/profile/UserImageUpload";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Header style={styles.header} text={"User Profile"}/>
            <View style={styles.body}>
                <UserNameInput/>
                <UserImageUpload/>
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
    header: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.primaryColor,
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