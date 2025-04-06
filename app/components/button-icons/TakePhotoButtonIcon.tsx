import {Pressable, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import {Href, useRouter} from 'expo-router';

import {FontAwesome} from "@expo/vector-icons";
import FontAwesomeButtonIcon from "./FontAwesomeButtonIcon";
/*
Note:
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "Ionicons")

The Expo Go <FontAwesome/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

Reference: https://docs.expo.dev/guides/icons/
*/

type Props = {
    userKey: string;
    label?: string;
    onPress: () => void;
}
export default function TakePhotoButtonIcon({userKey, label, onPress}: Props) {
    const router = useRouter();
    const takePhotoRoute = `home/${userKey}/take-photo` as Href;

    const localOnPressHandler = () => {
        onPress();
        router.navigate(takePhotoRoute);
    };

    return (
        <FontAwesomeButtonIcon name="camera" onPress={localOnPressHandler} label={label}/>
    );
}