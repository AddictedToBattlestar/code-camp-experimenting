import {StyleSheet, View, ViewStyle} from "react-native";

type Props = {
    style: ViewStyle;
}

export function Header({style}: Props) {
    return (
        <View style={[styles.container, style]}>Technology Camp</View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: "center",
        fontSize: 24,
    }
});