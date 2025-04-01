import {StyleSheet, Text, ViewStyle} from "react-native";

type Props = {
    text: string;
    style?: ViewStyle;
}

export default function Header({text, style}: Readonly<Props>) {
    return (
        <Text style={[styles.container, style]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: "center",
        fontSize: 24
    }
});