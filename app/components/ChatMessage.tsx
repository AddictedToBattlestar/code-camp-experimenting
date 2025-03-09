import {StyleSheet, Text, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";

type Props = {
    text: string;
    who: string;
}

export default function ChatMessage({text, who}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.whoText}>{who}</Text>
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
    whoText: {
        color: GreyScaleColorScheme[4]
    },
    messageContainer: {
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.tintColor,
        color: Colors.default.color
    }
})
