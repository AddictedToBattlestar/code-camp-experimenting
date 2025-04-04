import {Pressable, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import {useNavigation, useRouter} from "expo-router";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserProfileImageUpload from "@/app/components/profile/UserProfileImageUpload";
import InitialUserProfileImages from "@/constants/InitialUserProfileImages";
import ImageData from "@/app/objects/ImageData";
import {Ionicons} from "@expo/vector-icons";

import useUserName from "@/app/hooks/useUserName";

export default function Profile() {
    const {userName, storeUserName} = useUserName();

    const localSetUserName = async (value: string) => {
        console.log(`setting user name: ${value}`);
        await storeUserName(value);
        if (!userProfileImage) {
            setUserProfileImageFromUserName(value);
        }
    }

    // userProfileImages: loaded from local data
    const [userProfileImages, setUserProfileImages] = useState<Map<string, ImageData>>(InitialUserProfileImages);

    // userProfileImage: profile image for the current user
    const [userProfileImage, setUserProfileImage] = useState<string | undefined | null>(null);

    const updateUserProfileImage = (value: string) => {
        setUserProfileImage(value);

        const localUserProfileImage = new ImageData(value);
        const localUserProfileImages = userProfileImages.set(userName, localUserProfileImage);
        setUserProfileImages(localUserProfileImages);
        console.log(`userProfileImages.keys:`, Array.from(userProfileImages.keys()));
    }

    const setUserProfileImageFromUserName = (userName: string) => {
        const currentUserProfileImageValue = userProfileImages.get(userName);
        if (currentUserProfileImageValue) {
            console.log(`userProfileImage located`);
            setUserProfileImage(currentUserProfileImageValue.uri)
        } else {
            setUserProfileImage(null);
        }
    };

    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        console.log(`userProfileImages.keys:`, Array.from(userProfileImages.keys()));

        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => router.navigate('/')} style={styles.profileButton}>
                    <Ionicons name="chatbubbles" size={18}/>
                </Pressable>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <UserNameInput userName={userName} setUserName={localSetUserName}/>
                <UserProfileImageUpload userProfileImage={userProfileImage}
                                        updateUserProfileImage={updateUserProfileImage}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.backgroundColor,
        color: Colors.default.color
    },
    body: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
        gap: 10
    },
    imageUploadButton: {
        width: 200,
        height: 35,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.color,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    imageUploadButtonText: {
        color: Colors.default.backgroundColor,
    },
    profileButton: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: Colors.default.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
    }
});