import app from "@/firebaseConfig";
import {getDatabase, ref, set} from "firebase/database";

export default function useFirebaseProfileImages() {
    const pathName = 'profile-images';
    const database = getDatabase(app);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, pathName);

    const findProfileImageByUserName = async (userName: string) => {
        const underscoredUserName = getUnderScoredUserName(userName);
        const result = ref(database, `${pathName}/${underscoredUserName}`);
        if (result) {
            console.debug(`FOUND - Profile image search result for ${userName}`);
            return result;
        }
        console.debug(`not found - Profile image search result for ${userName}`);
        return result;
    };

    const getUnderScoredUserName = (userName: string) => {
        return userName.replace(/ /g, '_');
    }

    const storeProfileImage = (userName: string, profileImage: string) => {
        const underscoredUserName = getUnderScoredUserName(userName);
        console.debug(`Storing a profile image for ${userName} (${underscoredUserName})`);
        // const test = {uri: profileImage};
        set(ref(database, `${pathName}/${underscoredUserName}`), profileImage);
    };

    return {findProfileImageByUserName, storeProfileImage}
}