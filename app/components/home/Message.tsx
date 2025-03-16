import {StyleSheet, Text, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import MessageAvatarBubble from "@/app/components/home/MessageAvatarBubble";

type Props = {
    text: string;
    who: string;
}

export default function Message({text, who}: Props) {
    return (
        <View style={styles.container}>
            <MessageAvatarBubble who={who}/>
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
});
