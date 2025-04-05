import { useCallback, useEffect, useState } from "react";
import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    View
} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import useFirebaseUserData from "./hooks/useFirebaseUserData";
import useUserKeyLocalStorage from "./hooks/useUserKeyInLocalStorage";
import {Href, useFocusEffect, useRouter} from "expo-router";


export default function Index() {
    const router = useRouter();
    const [userName, setUserName] = useState<string>('');
    const {findByUserNameInFirebase, storeUserDataInFirebase} = useFirebaseUserData();
    const {userKeyInLocalStorage, storeUserKeyInLocalStorage} = useUserKeyLocalStorage();
    const homeRoute = "/home" as Href;

    const storeUserName = async () => {
        const existingUserData = findByUserNameInFirebase(userName);
        if (existingUserData) {
            // Something only to be done for demo/training situations
            console.log(`The user name ${userName} already exists.  Assuming identity of that user.`);
            await storeUserKeyInLocalStorage(existingUserData.key);

        } else {
            const newUserData = await storeUserDataInFirebase(userName);
            await storeUserKeyInLocalStorage(newUserData.key);
        }
        router.replace(homeRoute);
    };

    const handleKeyPress = async (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === "Enter") {
            await storeUserName();
        }
    }

    const checkIfLoggedIn = () => {
        if (userKeyInLocalStorage) {
            console.info(`Index.checkIfLoggedIn: User already registered and has a user key of: ${userKeyInLocalStorage}`);
            router.replace(homeRoute);
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
                value={userName}
                placeholder={"Enter your desired user name here"}
                placeholderTextColor={GreyScaleColorScheme[4]}
                onChangeText={(text) => {
                    setUserName(text);
                }}
                onKeyPress={handleKeyPress}
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
