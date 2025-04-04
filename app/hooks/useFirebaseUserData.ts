import app from "@/firebaseConfig";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {useEffect, useState} from "react";
import UserData from "@/app/objects/UserData";
import uuid from 'react-native-uuid';

export default function useFirebaseUserData() {
    const pathName = 'user-data';
    const [userDataListing, setUserDataListings] = useState<Map<string, UserData>>(new Map());

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    // Function to fetch data from the database
    const fetchData = () => {
        onValue(collectionRef, (snapshot) => {
            const data = snapshot.val();
            // Check if dataItem exists
            if (data) {
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
                setUserDataListings(result);
            } else {
                setUserDataListings(new Map());
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const findByUserName = (userName: string): UserData | undefined => {
        if (!userName) {
            return undefined;
        }
        debugger;
        const matchingUserData = userDataListing.values().find(userData => {
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

    const storeUserData = async (userName: string, profileImage?: string | undefined) => {
        console.debug(`useFirebaseUserData: Storing data for ${userName}`);
        const newUserData = new UserData(uuid.v1().toString(), userName, profileImage);
        const stringifiedUserData = JSON.stringify(newUserData);
        await set(ref(database, `${pathName}/${newUserData.key}`), stringifiedUserData);
        return newUserData;
    };

    return {userDataListing, findByUserName, findByKey, storeUserData}
}