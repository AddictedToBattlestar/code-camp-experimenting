import {ScrollView, StyleSheet, ViewStyle} from "react-native";
import {InitialUserImages} from "@/constants/InitialUserImages";

import Message from "@/app/components/home/Message";
import {Fragment} from "react";
import MessageFromSelf from "@/app/components/home/MessageFromSelf";
import MessageObject from "@/app/objects/MessageObject";

type Props = {
    style: ViewStyle;
    userNameForSelf: string;
    messages: MessageObject[];
};

export default function Body({style, messages, userNameForSelf}: Props) {
    return (
        <ScrollView style={[styles.container, style]}>
            {messages.map((message) => (
                <Fragment key={message.key}>
                    {(message.who === userNameForSelf)
                        ? <MessageFromSelf text={message.messageText} who={message.who}/>
                        : <Message text={message.messageText} who={message.who}
                                   userImage={InitialUserImages.get(message.who)}/>
                    }
                </Fragment>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
});
