import app from "@/firebaseConfig";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {useEffect, useState} from "react";
import UserData from "@/app/objects/UserData";
import uuid from 'react-native-uuid';

export default function useFirebaseUserData(userKey: string | string[] | null) {
    const pathName = 'user-data';
    const [userDataListing, setUserDataListing] = useState<Map<string, UserData>>(new Map());
    const [userDataForSelf, setuserDataForSelf] = useState<UserData | null>();

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    useEffect(() => {
        console.debug(`useFirebaseUserData.useEffect: userKey`, userKey);
        fetchData(Array.isArray(userKey) ? userKey[0] : userKey);
    }, [userKey]);

    const fetchData = (userKey: string | null) => {
        // Listen for changes in the collection
        onValue(collectionRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.debug(`useFirebaseUserData.fetchData: ${Object.entries(data).length} items being kept in memory`);
                const result: Map<string, UserData> = new Map();
                for (const [key, value] of Object.entries(data)) {
                    // @ts-ignore
                    const jsonObject = JSON.parse(value);
                    const userData = new UserData(
                        // @ts-ignore
                        jsonObject.key,
                        // @ts-ignore
                        jsonObject.userName,
                        // @ts-ignore
                        jsonObject.profileImage
                    );
                    // @ts-ignore
                    result.set(key, userData)
                }
                setUserDataListing(result);
                if (userKey && result.get(userKey)) {
                    console.debug(`useFirebaseUserData.fetchData: ${userKey} matched.  Setting userDataForSelf.`)
                    setuserDataForSelf(result.get(userKey));
                } else {
                    setuserDataForSelf(null);
                }
            } else {
                setUserDataListing(new Map());
            }
        });
    };

    const findByUserName = (userName: string): UserData | undefined => {
        if (!userName) {
            return undefined;
        }
        const matchingUserData = Array.from(userDataListing.values()).find(userData => {
            if (userData.userName === userName) {
                console.debug(`useFirebaseUserData.findByUserName: The userName of ${userName} was found`);
                return true;
            }
        });
        return matchingUserData;
    };

    const findByKey = async (userKey: string) => {
        if (!userKey) {
            return null;
        }
        return userDataListing.get(userKey);
    };

    const storeNewUserData = async (userName: string, profileImage?: string | undefined) => {
        console.debug(`useFirebaseUserData.storeUserData: Attempting to store data for ${userName}`);
        const newUserData = new UserData(uuid.v1().toString(), userName, profileImage);
        const stringifiedUserData = JSON.stringify(newUserData);
        await set(ref(database, `${pathName}/${newUserData.key}`), stringifiedUserData);
        return newUserData;
    };

    const storeUserData = async (updatedUserData: UserData) => {
        const stringifiedUserData = JSON.stringify(updatedUserData);
        await set(ref(database, `${pathName}/${updatedUserData.key}`), stringifiedUserData);
    }

    return { 
        userDataForSelf,
        userDataListing, 
        storeNewUserData,
        storeUserData,
        findByUserName, 
        findByKey
    }
}
