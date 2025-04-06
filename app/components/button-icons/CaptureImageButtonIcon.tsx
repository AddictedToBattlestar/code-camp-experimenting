import {Platform, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import MessageType from "@/app/objects/MessageType";
import * as FileSystem from 'expo-file-system';

import FontAwesomeButtonIcon from "@/app/components/button-icons/FontAwesomeButtonIcon";


type Props = {
    label?: string;
    createNewMessage: (messageText: string, messageType: MessageType) => void;
}
export default function CaptureImageButtonIcon({label, createNewMessage}: Readonly<Props>) {
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
        <FontAwesomeButtonIcon name="image" onPress={pickImageAsync} label={label}/>
    );
}
