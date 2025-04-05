import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";
import {Href, useRouter} from "expo-router";

import UserNameInput from "@/app/components/profile/UserNameInput";
import UserProfileImageUpload from "@/app/components/profile/UserProfileImageUpload";

import useUserKeyInLocalStorage from "@/app/hooks/useUserKeyInLocalStorage";
import UserData from "@/app/objects/UserData";
import useFirebaseUserData from "@/app/hooks/useFirebaseUserData";

export default function Profile() {
    const [, setUserName] = useState<string>()
    const [, setProfileImage] = useState<string>()
    const {userDataListing} = useFirebaseUserData();
    const {userKeyInLocalStorage} = useUserKeyInLocalStorage();
    const [currentUserData, setCurrentUserData] = useState<UserData>();

    const router = useRouter();
    useEffect(() => {
        console.log('Profile.useEffect');
        console.log('Profile.useEffect: userKeyFromLocalStorage', userKeyInLocalStorage);
        console.log("Profile.useEffect: userDataListing.keys()", Array.from(userDataListing?.keys()));
        if (userKeyInLocalStorage === null) {
            const loginRoute = "/" as Href;
            router.replace(loginRoute);
        } else if (userKeyInLocalStorage && userDataListing) {
            setCurrentUserData(userDataListing.get(userKeyInLocalStorage))
            setUserName(currentUserData?.userName);
            setProfileImage(currentUserData?.profileImage);
        }
    }, []);

    if (!currentUserData) {
        return (
            <View>
                <View>
                    <Text>userKeyFromLocalStorage: {userKeyInLocalStorage}</Text>
                </View>
                <View>
                    <Text>userDataListing.size: {userDataListing?.size}</Text>
                </View>
                <View>
                    <Text>userDataListing keys: {Array.from(userDataListing?.keys())}</Text>
                </View>
                <View>
                    <Text></Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <UserNameInput userName={currentUserData.userName} setUserName={setUserName} />
                <UserProfileImageUpload userProfileImage={currentUserData.profileImage}
                                        updateUserProfileImage={setProfileImage}/>
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
