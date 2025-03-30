import {Pressable, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

type PhotoButtonIconProps = {
    createNewMessage: (messageText: string) => void;
}

export default function PhotoButtonIcon({createNewMessage}: PhotoButtonIconProps) {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            createNewMessage(result.assets[0].uri);
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