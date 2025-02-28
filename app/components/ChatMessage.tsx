import {StyleSheet, Text, View} from "react-native";

export function ChatMessage() {
    return (
        <View style={styles.container}>
            <Text>Chat Message</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
    }
})