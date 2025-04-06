import {Platform, Pressable, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import MessageType from "@/app/objects/MessageType";
import * as FileSystem from 'expo-file-system';

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
    createNewMessage: (messageText: string, messageType: MessageType) => void;
}
export default function ImageButtonIcon({createNewMessage}: Readonly<Props>) {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (Platform.OS === 'web') {
                createNewMessage(result.assets[0].uri, MessageType.Image);
            } else {
                const base64Img = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType?.Base64 });
                createNewMessage("data:image/png;base64,"+base64Img, MessageType.Image);
            }
        } else {
            alert('You did not select any image.');
        }
    };


    return (
        <Pressable
            style={styles.container}
            onPress={pickImageAsync}
        >
            <FontAwesome name="image" size={18} style={styles.icon}/>
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
