import {useEffect, useState} from "react";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUserKeyInLocalStorage() {
    const storageKey = 'userKeyInLocalStorage';

    // string     | null           | undefined
    // user found | user not setup | not initialized
    const [userKeyInLocalStorage, setUserKeyInLocalStorage] = useState<string | null | undefined>(undefined);

    const getUserKeyInLocalStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(storageKey);
            console.debug(`useUserKeyInLocalStorage.getUserKeyInLocalStorage: retrieved ${storageKey}: ${result}`);
            return result;
        } catch (ignoredError) {
            return null;
        }
    };

    const storeUserKeyInLocalStorage = async (value: string) => {
        console.debug(`useUserKeyInLocalStorage.storeUserKeyInLocalStorage Setting ${storageKey} to: ${value}`);
        setUserKeyInLocalStorage(value);
        console.debug(`useUserKeyInLocalStorage.storeUserKeyInLocalStorage: Storing ${storageKey} as: ${value}`);
        try {
            await AsyncStorage.setItem(storageKey, value);
        } catch (e) {
            console.error(`useUserKeyInLocalStorage.storeUserKeyInLocalStorage: There was a problem setting ${storageKey}: ${userKeyInLocalStorage}`, e);
            alert(`useUserKeyInLocalStorage.storeUserKeyInLocalStorage: There was a problem setting ${storageKey}: ${userKeyInLocalStorage}`);
        }
    };

    useEffect(() => {
        getUserKeyInLocalStorage().then((value) => {
            if (value !== null) {
                console.debug(`useUserKeyInLocalStorage.useEffect Setting ${storageKey} to: ${value}`);
                setUserKeyInLocalStorage(value);
            }
        });
    }, []);

    return {userKeyInLocalStorage, storeUserKeyInLocalStorage};
}
