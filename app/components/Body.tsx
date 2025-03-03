import {StyleSheet, View} from "react-native";
import { Constants } from "@/constants/Constants";

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
        gap: Constants.generic.padding
    }
});