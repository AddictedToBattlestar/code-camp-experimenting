import {Pressable, StyleSheet, Text, View} from "react-native";
import Header from "@/app/components/Header";
import React from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import UserNameInput from "@/app/components/profile/UserNameInput";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Header style={styles.header} text={"User Profile"}/>
            <View style={styles.body}>
                <UserNameInput/>

                <View>
                    <Pressable onPress={() => console.log('You pressed the choose an image button.')}>
                        <Text>Choose a profile image</Text>
                    </Pressable>
                </View>
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
        backgroundColor: Colors.default.lighterBackgroundColor
    },
    body: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
    }
});