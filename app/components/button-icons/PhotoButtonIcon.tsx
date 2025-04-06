import {Pressable, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import {Href, useRouter} from 'expo-router';

import {FontAwesome} from "@expo/vector-icons";
/*
Note:
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "Ionicons")

The Expo Go <FontAwesome/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

Reference: https://docs.expo.dev/guides/icons/
*/

type Props = {
    onPress: () => void;
}
export default function PhotoButtonIcon({onPress}: Props) {
    const router = useRouter();
    const takePhotoRoute = './take-photo' as Href;

    const localOnPressHandler = () => {
        onPress();
        router.navigate(takePhotoRoute);
    };

    return (
        <Pressable
            style={styles.container}
            onPress={localOnPressHandler}
        >
            <FontAwesome name="camera" size={18} style={styles.icon}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 35,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: Colors.default.color,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        color: Colors.default.color
    }
});
