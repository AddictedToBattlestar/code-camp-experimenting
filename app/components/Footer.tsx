import {Pressable, StyleSheet, TextInput, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import { Constants } from "@/constants/Constants";

export function Footer() {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => console.log('You pressed a button.')}
            >
                <FontAwesome name="plus" size={18}/>
            </Pressable>

            <TextInput
                style={styles.input}
                value={""}
                placeholder={"Message"}
                onChangeText={text => console.log(`Footer.TextInput.onChangeText: ${text}`)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: Constants.generic.padding
    },
    button: {
        width: 35,
        height: 35,
        borderRadius: 17,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
    }
})