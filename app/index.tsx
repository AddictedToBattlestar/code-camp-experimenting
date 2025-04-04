import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import useFirebaseUserData from "./hooks/useFirebaseUserData";
import useLocalUserKeyStorage from "./hooks/useLocalUserKeyStorage";
import { useFocusEffect, useRouter } from "expo-router";


export default function Index() {
    const router = useRouter();
    const [localUserName, setLocalUserName] = useState<string>('');
    const {findByUserName, storeUserData} = useFirebaseUserData();
    const {localUserKey, storeLocalUserKey} = useLocalUserKeyStorage();

    const storeUserName = async () => {
        const existingUserData = findByUserName(localUserName);
        if (existingUserData) {
            alert(`The user name ${localUserName} already exists.  Assuming identity of that user ().`);
            await storeLocalUserKey(existingUserData.key);

        } else {
            const newUserData = await storeUserData(localUserName);
            await storeLocalUserKey(newUserData.key);
        }
        router.replace('/home');
    };

    const checkIfLoggedIn = () => {
        if (localUserKey) {
            console.info(`Index.checkIfLoggedIn: User already registered and has a user key of: ${localUserKey}`);
            router.replace('/home');
        } else {
            console.info('Index.checkIfLoggedIn: User NOT setup with a user key');
        }
    }

    useEffect(() => {
        checkIfLoggedIn();
    }, [])

    useFocusEffect(
        useCallback(() => {
            checkIfLoggedIn();
        }, [])
    );

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
function userRouter() {
    throw new Error("Function not implemented.");
}

