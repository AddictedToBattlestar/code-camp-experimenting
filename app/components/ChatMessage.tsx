import {StyleSheet, Text, View} from "react-native";
import { Constants } from "@/constants/Constants";


type Props = {
    text: string;
    who: string;
}


export function ChatMessage({ text, who }: Props) {
    return (
        <View style={styles.container}>
            <Text>{who}</Text>
            <Text style={styles.messageContainer}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: Constants.generic.padding
    },
    messageContainer: {
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
    }
})
