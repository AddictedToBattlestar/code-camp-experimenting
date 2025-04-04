import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import React from "react";
import {Constants} from "@/constants/Constants";
// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/

type Props = {
    userName: string;
    setUserName: (value: string) => void;
}
export default function UserNameInput({userName, setUserName}: Readonly<Props>) {
    return (
        <View>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
                style={styles.input}
                value={userName}
                placeholder={"Enter your desired user name here"}
                placeholderTextColor={styles.input.color}
                onChangeText={(text) => {
                    setUserName(text);
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