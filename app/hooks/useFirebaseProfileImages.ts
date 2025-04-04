import {useEffect, useState} from "react";
import uuid from 'react-native-uuid';
import ImageData from "@/app/objects/ImageData";

import app from "@/firebaseConfig";
import {getDatabase, onValue, ref, set} from "firebase/database";

export default function useFirebase() {
    const pathName = 'profile-images';
    // messages: loaded from local data and kept in memory
    const [profileImages, setProfileImages] = useState<ImageData[]>([]);

    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    // Function to fetch data from the database
    const fetchData = () => {

        //TODO: need to look into .orderByChild("time").limitToLast(50)
        // Listen for changes in the collection
        onValue(collectionRef, (snapshot) => {
            const dataItem = snapshot.val();

            // Check if dataItem exists
            if (dataItem) {
                // Convert the object values into an array
                const rawData = Object.values(dataItem).reverse();
                const messages = rawData.map((rawItem) => {
                    return new ImageData(
                        // @ts-ignore
                        rawItem.uri,
                        // @ts-ignore
                        rawItem?.width,
                        // @ts-ignore
                        rawItem?.height,
                        // @ts-ignore
                        rawItem?.type,
                        // @ts-ignore
                        rawItem?.mimetype,
                        // @ts-ignore
                        rawItem?.fileName,
                    );
                })
                setProfileImages(messages);
            }
        });
    };

    const storeProfileImage = (imageData: ImageData) => {
        console.debug('Storing a profile image', ImageData);
        set(ref(database, `${pathName}/${uuid.v1().toString()}`), ImageData);
    };

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    return {profileImages, storeProfileImage}
}