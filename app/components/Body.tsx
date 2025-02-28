import {StyleSheet, Text, View} from "react-native";

import { ChatMessage } from "@/app/components/ChatMessage";

export function Body() {
    return (
        <View style={styles.container}>
            {Array.from({ length: 4 }).map((_, index) => (
                <ChatMessage />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    }
});