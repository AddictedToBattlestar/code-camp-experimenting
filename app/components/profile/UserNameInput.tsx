import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {Constants} from "@/constants/Constants";

import AsyncStorage from '@react-native-async-storage/async-storage';
// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/

export default function UserNameInput() {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    const storeUserName = async (value: string) => {
        try {
            await AsyncStorage.setItem('userName', value);
        } catch (e) {
            console.error(`There was a problem setting userName: ${userName}`, e);
            alert(`There was a problem setting userName: ${userName}`);
        }
    };

    useEffect(() => {
        getUserName().then((value) => {
            if (value !== null) {
                setUserName(value);
            }
        });
    }, []);

    return (
        <View>
            <Text style={styles.inputText}>User name</Text>
            <TextInput
                style={styles.input}
                value={userName}
                placeholder={"Enter your desired user name here"}
                placeholderTextColor={styles.input.color}
                onChangeText={text => {
                    setUserName(text);
                    storeUserName(text);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputText: {
        color: GreyScaleColorScheme[4],
        padding: Constants.generic.padding,
    },
    input: {
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        color: Colors.default.color,
        padding: Constants.generic.padding,
    }
});