import {StyleSheet, Text, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors} from "@/constants/Colors";
import MessageType from "@/app/objects/MessageType";

type Props = {
    content: string;
    type: MessageType;
}

export default function MessageFromSelf({content, type}: Props) {
    if (type === MessageType.Text) {
        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageTextContainer}>
                        {content}
                    </Text>
                </View>
            </View>
        )
    } else if (type === MessageType.Image) {
        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageTextContainer}>
                        (Insert image here)
                    </Text>
                    {/*<Image source={{uri: content}} style={styles.messageTextContainer}/>*/}
                </View>
            </View>
        )
    }
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
        backgroundColor: Colors.default.primaryColor,
        color: Colors.default.color
    }
})
