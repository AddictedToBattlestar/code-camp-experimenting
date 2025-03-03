import {StyleSheet, View} from "react-native";
import { Constants } from "@/constants/Constants";
import { InitialMessages } from "@/constants/InitialMessages";

import { ChatMessage } from "@/app/components/ChatMessage";

export function Body() {
    return (
        <View style={styles.container}>
            {InitialMessages.map((message) => (
                <ChatMessage text={message.messageText} />
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