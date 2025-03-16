import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "../../../constants/Colors";
import React, {useEffect, useState} from "react";
import {Constants} from "@/constants/Constants";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserNameInput() {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    useEffect(() => {
        getUserName().then((value) => {
            if (value !== null) {
                setUserName(value);
                console.debug(`userName: ${value}`);
            }
        });
    }, []);

    const storeUserName = async (value: string) => {
        try {
            await AsyncStorage.setItem('userName', value);
        } catch (e) {
            console.error(`There was a problem setting userName: ${userName}`, e);
            alert(`There was a problem setting userName: ${userName}`);
        }
    };

    return (
        <View>
            <Text style={styles.inputText}>User name</Text>
            <TextInput
                style={styles.input}
                value={userName}
                placeholder={"Enter your desired user name here"}
                placeholderTextColor={GreyScaleColorScheme[4]}
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