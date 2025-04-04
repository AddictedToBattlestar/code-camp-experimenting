import {useCallback, useState} from "react";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";

export default function useLocalUserKeyStorage() {
    const [localUserKey, setLocalUserKey] = useState<string | null>();

    const getLocalUserKey = async () => {
        try {
            const result = await AsyncStorage.getItem('localUserKey');
            console.debug(`useLocalUserKeyStorage: retrieved localUserKey: ${result}`);
            return result;
        } catch (ignoredError) {
            return null;
        }
    };

    const storeLocalUserKey = async (value: string) => {
        setLocalUserKey(value);
        console.debug(`useLocalUserKeyStorage: Storing localUserKey: ${value}`);
        try {
            await AsyncStorage.setItem('userName', value);
        } catch (e) {
            console.error(`useLocalUserKeyStorage: There was a problem setting localUserKey: ${localUserKey}`, e);
            alert(`useLocalUserKeyStorage: There was a problem setting localUserKey: ${localUserKey}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getLocalUserKey().then((value) => {
                if (value !== null) {
                    setLocalUserKey(value);
                }
            });
        }, [])
    );


    return {localUserKey, storeLocalUserKey};
}