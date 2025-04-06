import {Pressable, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";

import {FontAwesome} from "@expo/vector-icons";

type Props = {
    onPress: () => void;
}
export default function PhotoButtonIcon({onPress}: Props) {
    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <FontAwesome name="plus" size={18} style={styles.icon}/>
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
