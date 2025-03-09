import {StyleSheet, View, ViewStyle} from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
    text: string;
    style?: ViewStyle;
}

export function Header({text, style}: Props) {
    return (
        <View style={[styles.container, style]}>{text}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: "center",
        fontSize: 24
    }
});