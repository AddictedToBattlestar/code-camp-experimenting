import {StyleSheet, Text, TextInput, View} from "react-native";
import Header from "@/app/components/Header";
import React, {useEffect, useState} from "react";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            const value = await AsyncStorage.getItem('userName');
            if (value !== null) {
                setUserName(value);
            }
        } catch (ignoredError) {
            // error reading value
        }
    };

    useEffect(() => {
        getUserName();
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
        <View style={styles.container}>
            <Header style={styles.header} text={"User Profile"}/>
            <View style={styles.body}>
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
    },
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