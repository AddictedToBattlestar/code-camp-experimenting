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
            <View style={styles.imageContainer}>
                <View style={styles.imageBubble}>
                    <Text style={styles.imageContainerText}>AR</Text>
                </View>
            </View>
            <View style={styles.messageContainer}>
                <Text style={styles.whoText}>{who}</Text>
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
        flexDirection: "row",
        gap: Constants.generic.padding,
    },
    imageContainer: {
        display: "flex",
        flexDirection: "column-reverse",
    },
    imageBubble: {
        width: 30,
        height: 30,
        borderRadius: 17,
        backgroundColor: GreyScaleColorScheme[5],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    imageContainerText: {
        color: Colors.default.color,
    },
    messageContainer: {
        flexBasis: '80%',
    },
    whoText: {
        color: GreyScaleColorScheme[4]
    },
    messageTextContainer: {
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.tintColor,
        color: Colors.default.color
    }
})
