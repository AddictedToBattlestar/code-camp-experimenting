import {StyleSheet, Text, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors} from "@/constants/Colors";

type Props = {
    text: string;
    who: string;
}

export default function ChatMessageFromSelf({text, who}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageTextContainer}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Constants.generic.padding,
        display: "flex",
        flexDirection: "row-reverse",
    },
    messageContainer: {
        flexBasis: '80%',
    },
    messageTextContainer: {
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.highlightColor,
        color: Colors.default.color
    }
})
