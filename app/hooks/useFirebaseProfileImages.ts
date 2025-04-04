import app from "@/firebaseConfig";
import {child, get, getDatabase, onValue, ref, set} from "firebase/database";
import {useEffect, useState} from "react";

export default function useFirebaseProfileImages() {
    const pathName = 'profile-images';
    const [profileImages, setProfileImages] = useState<Map<string, string>>(new Map());

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    // Function to fetch data from the database
    const fetchData = () => {
        onValue(collectionRef, (snapshot) => {
            const data = snapshot.val();
            console.debug(`profile images`, data);
            // Check if dataItem exists
            if (data) {
                const result: Map<string, string> = new Map();
                for (const [key, value] of Object.entries(data)) {
                    // @ts-ignore
                    result.set(key, value)
                }
                setProfileImages(result);
            } else {
                setProfileImages(new Map());
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const findProfileImageByUserName = async (userName: string) => {
        if (!userName) {
            return null;
        }
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `${pathName}/${userName}`));
        if (snapshot.exists()) {
            console.debug(`Profile image for user ${userName} found`);
            return snapshot.val();
        } else {
            console.debug(`Profile image for user ${userName} not found`);
            return null;
        }
    };

    const storeProfileImage = (userName: string, profileImage: string) => {
        console.debug(`Storing a profile image for ${userName}`);
        set(ref(database, `${pathName}/${userName}`), profileImage);
    };

    return {profileImages, findProfileImageByUserName, storeProfileImage}
}