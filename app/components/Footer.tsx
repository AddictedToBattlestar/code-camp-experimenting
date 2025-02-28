import {Pressable, StyleSheet, TextInput, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export function Footer() {
    return (
        <View style={styles}>
            <Pressable
                style={styles.button}
                onPress={() => console.log('You pressed a button.')}
            >
                <FontAwesome name="plus" size={18}/>
            </Pressable>

            <View>
                <TextInput
                    style={styles.input}
                    value={""}
                    placeholder={"Message"}
                    onChangeText={text => console.log(`Footer.TextInput.onChangeText: ${text}`)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    button: {
        width: 30,
        height: 30,
        borderRadius: 14,
        borderWidth: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 3,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
    }
})