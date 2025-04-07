import { useCallback, useState } from "react";
import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    View
} from "react-native";
import {Href, useFocusEffect, useRouter} from "expo-router";

import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";
import useLocalStorage from "./hooks/useLocalStorage";

export default function Index() {
    const router = useRouter();
    const [userKeyInLocalStorage, setUserKeyInLocalStorage] = useLocalStorage('userKey');
    const [userName, setUserName] = useState<string>('');
    const {findByUserName, storeNewUserData} = useFirebaseUserData(null);

    useFocusEffect(
        useCallback(() => {
            if (userKeyInLocalStorage) {
                console.log(`Index.useFocusEffect: userKey found in local storage.  Redirecting to the chat screen.  (userKey: ${userKeyInLocalStorage})`);
                const homeRoute = `/home/${userKeyInLocalStorage}/chat` as Href;
                router.replace(homeRoute);
            }
        }, [userKeyInLocalStorage])
    );

    const storeUserName = async () => {
        if (!userName) {
            return;
        }
        const existingUserData = findByUserName(userName);
        let userData;
        if (existingUserData) {
            console.log(`The user name ${userName} already exists.  Assuming identity of that user. (userKey: ${existingUserData.key})`);
            userData = existingUserData;
        } else {
            userData = await storeNewUserData(userName);
        }
        setUserKeyInLocalStorage(userData.key);
        const homeRoute = `/home/${userData.key}/chat` as Href;
        router.replace(homeRoute);
    };

    const handleKeyPress = async (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === "Enter") {
            await storeUserName();
        }
    }

    return (
        <View style={styles.container}>
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
        borderColor: Colors.default.color,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        display: "flex",
        alignItems: "center",
    }
});
