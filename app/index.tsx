import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    View
} from "react-native";
import {Href, useRouter} from "expo-router";

import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";


export default function Index() {
    const router = useRouter();
    const [userName, setUserName] = useState<string>('');
    const {findByUserName, storeNewUserData} = useFirebaseUserData(null);

    const storeUserName = async () => {
        if (!userName) {
            return;
        }
        const existingUserData = findByUserName(userName);
        if (existingUserData) {
            // Something only to be done for demo/training situations
            console.log(`The user name ${userName} already exists.  Assuming identity of that user. (userKey: ${existingUserData.key})`);
            const homeRoute = `/home/${existingUserData.key}/chat` as Href;
            router.replace(homeRoute);
        } else {
            const newUserData = await storeNewUserData(userName);
            const homeRoute = `/home/${newUserData.key}/chat` as Href;
            router.replace(homeRoute);
        }
    };

    const handleKeyPress = async (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === "Enter") {
            await storeUserName();
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <Pressable onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <Text style={styles.welcomeText}>Welcome! Please enter a user name to proceed.</Text>
                    <TextInput
                        style={styles.input}
                        value={userName}
                        placeholder={"Enter your desired user name here"}
                        placeholderTextColor={GreyScaleColorScheme[4]}
                        onChangeText={(text) => {
                            setUserName(text);
                        }}
                        onKeyPress={handleKeyPress}
                        onSubmitEditing={storeUserName}
                    />
                    <Pressable
                        style={styles.continueButton}
                        onPress={storeUserName}
                    >
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
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
        borderColor: Colors.default.color,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        display: "flex",
        alignItems: "center",
    }
});
