import {StyleSheet, Text, View} from "react-native";
import { Constants } from "@/constants/Constants";

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
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
    }
})