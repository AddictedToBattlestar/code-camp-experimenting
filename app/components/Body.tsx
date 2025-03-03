import {StyleSheet, View, ViewStyle} from "react-native";
import { Constants } from "@/constants/Constants";
import { InitialMessages } from "@/constants/InitialMessages";

import { ChatMessage } from "@/app/components/ChatMessage";

type Props = {
    style: ViewStyle;
};

export function Body({style}: Props) {
    return (
        <View style={[styles.container, style]}>
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