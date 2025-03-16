import {StyleSheet, Text, View} from "react-native";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";

type Props = {
    who: string;
}

export default function MessageAvatarBubble({who}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Text style={styles.text}>{who[0]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column-reverse",
    },
    bubble: {
        width: 30,
        height: 30,
        borderRadius: 17,
        backgroundColor: GreyScaleColorScheme[5],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        color: Colors.default.color,
    }
});
