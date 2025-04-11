import {useEffect, useState} from "react";

// https://docs.expo.dev/develop/user-interface/store-data/
// --> https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useLocalStorage(storageKey: string): [string | null | undefined, (value: string | null) => Promise<void>] {
    // string      | null           | undefined
    // value found | no value found | not initialized
    const [currentValue, setCurrentValue] = useState<string | null | undefined>(undefined);

    const getValue = async () => {
        try {
            const result = await AsyncStorage.getItem(storageKey);
            console.debug(`useLocalStorage.getUserKeyInLocalStorage: retrieved ${storageKey}: ${result}`);
            return result;
        } catch (ignoredError) {
            return null;
        }
    };

    const setValue = async (newValue: string | null) => {
        console.debug(`useLocalStorage.setValue Setting ${storageKey} to: ${newValue}`);
        setCurrentValue(newValue);
        console.debug(`useLocalStorage.setValue: Storing ${storageKey} as: ${newValue}`);
        try {
            if (newValue) {
                await AsyncStorage.setItem(storageKey, newValue);
            } else {
                await AsyncStorage.removeItem(storageKey);
            }
        } catch (e) {
            console.error(`useLocalStorage.setValue: There was a problem setting ${storageKey}: ${newValue}`, e);
            alert(`useLocalStorage.setValue: There was a problem setting ${storageKey}: ${newValue}`);
        }
    };

    useEffect(() => {
        getValue().then((value) => {
            if (value !== null) {
                console.debug(`useLocalStorage.useEffect Setting ${storageKey} to: ${value}`);
                setCurrentValue(value);
            }
        });
    }, []);

    return [currentValue, setValue];
}
