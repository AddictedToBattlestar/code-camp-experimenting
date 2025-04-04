import {useEffect, useState} from "react";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useLocalUserKeyStorage() {
    const storageKey = 'localUserKey';

    // string     | null           | undefined 
    // user found | user not setup | not initialized
    const [localUserKey, setLocalUserKey] = useState<string | null | undefined>(undefined);

    const getLocalUserKey = async () => {
        try {
            const result = await AsyncStorage.getItem(storageKey);
            console.debug(`useLocalUserKeyStorage.getLocalUserKey: retrieved ${storageKey}: ${result}`);
            return result;
        } catch (ignoredError) {
            return null;
        }
    };

    const storeLocalUserKey = async (value: string) => {
        console.debug(`useLocalUserKeyStorage.storeLocalUserKey Setting ${storageKey} to: ${value}`);
        setLocalUserKey(value);
        console.debug(`useLocalUserKeyStorage.storeLocalUserKey: Storing ${storageKey} as: ${value}`);
        try {
            await AsyncStorage.setItem(storageKey, value);
        } catch (e) {
            console.error(`useLocalUserKeyStorage.storeLocalUserKey: There was a problem setting localUserKey: ${localUserKey}`, e);
            alert(`useLocalUserKeyStorage.storeLocalUserKey: There was a problem setting localUserKey: ${localUserKey}`);
        }
    };

    useEffect(() => {
        getLocalUserKey().then((value) => {
            if (value !== null) {
                console.debug(`useLocalUserKeyStorage.useEffect Setting ${storageKey} to: ${value}`);
                setLocalUserKey(value);
            }
        });
    }, []);

    return {localUserKey, storeLocalUserKey};
}