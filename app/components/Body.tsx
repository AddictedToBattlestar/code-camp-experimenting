import {ScrollView, StyleSheet, ViewStyle} from "react-native";
import { Constants } from "@/constants/Constants";
import { InitialMessages } from "@/constants/InitialMessages";

import { ChatMessage } from "@/app/components/ChatMessage";

type Props = {
    style: ViewStyle;
};

export function Body({style}: Props) {
    return (
        <ScrollView style={[styles.container, style]}>
            {InitialMessages.map((message) => (
                <ChatMessage text={message.messageText} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    }
});
