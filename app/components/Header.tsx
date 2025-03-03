import {StyleSheet, Text, View} from "react-native";

export function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Chat Title Message</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {
        textAlign: "center",
        fontSize: 24,
    }
});