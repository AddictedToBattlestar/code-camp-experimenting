import app from "@/firebaseConfig";
import {child, get, getDatabase, ref, set} from "firebase/database";

export default function useFirebaseProfileImages() {
    const pathName = 'profile-images';
    const database = getDatabase(app);

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

    return {findProfileImageByUserName, storeProfileImage}
}