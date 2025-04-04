import {useCallback, useState} from "react";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";

export default function useUserName() {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            const result = await AsyncStorage.getItem('userName');
            console.debug(`retrieved userName: ${result}`);
            return result;
        } catch (ignoredError) {
            return null;
        }
    };

    const storeUserName = async (value: string) => {
        setUserName(value);
        console.debug(`Storing userName: ${value}`);
        try {
            await AsyncStorage.setItem('userName', value);
        } catch (e) {
            console.error(`There was a problem setting userName: ${userName}`, e);
            alert(`There was a problem setting userName: ${userName}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getUserName().then((userNameValue) => {
                if (userNameValue !== null) {
                    setUserName(userNameValue);
                }
            });
        }, [])
    );


    return {userName, storeUserName};
}