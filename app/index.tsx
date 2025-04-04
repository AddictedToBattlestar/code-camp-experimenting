import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import useUserName from "@/app/hooks/useUserName";


export default function Index() {
    const {userName} = useUserName();
    const [localUserName, setLocalUserName] = useState<string>('');

    const storeUserName = () => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome! Please enter a user name to proceed.</Text>
            <TextInput
                style={styles.input}
                value={localUserName}
                placeholder={"Enter your desired user name here"}
                placeholderTextColor={GreyScaleColorScheme[4]}
                onChangeText={(text) => {
                    setLocalUserName(text);
                }}
            />
            <Pressable
                style={styles.continueButton}
                onPress={storeUserName}
            >
                <Text>Continue</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.generic.padding,
        gap: 25
    },
    welcomeText: {
        paddingTop: 25,
        textAlign: "center"
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
    },
    continueButton: {
        width: "100%",
        backgroundColor: Colors.default.primaryColor,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        color: Colors.default.color,
        padding: Constants.generic.padding,
        display: "flex",
        alignItems: "center",

    }
});
