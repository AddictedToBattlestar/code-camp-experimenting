import {ScrollView, StyleSheet, ViewStyle} from "react-native";
import {InitialMessages} from "@/constants/InitialMessages";

import ChatMessage from "@/app/components/ChatMessage";
import {Fragment} from "react";

type Props = {
    style: ViewStyle;
};

export default function Body({style}: Props) {
    return (
        <ScrollView style={[styles.container, style]}>
            {InitialMessages.map((message) => (
                <Fragment key={message.key}>
                    <ChatMessage text={message.messageText} who={message.who}/>
                </Fragment>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
});
