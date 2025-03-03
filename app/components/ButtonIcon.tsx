import {Pressable, StyleSheet, TextInput, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export function ButtonIcon() {
    return (
        <Pressable
        style={styles.container}
        onPress={() => console.log('You pressed a button.')}
    >
        <FontAwesome name="plus" size={18}/>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 35,
        borderRadius: 17,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});