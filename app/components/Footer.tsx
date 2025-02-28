import {StyleSheet, TextInput, View} from "react-native";

export function Footer() {
    return (
        <View>
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
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
    }
})