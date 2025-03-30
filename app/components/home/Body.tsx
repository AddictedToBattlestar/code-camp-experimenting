import {FlatList, StyleSheet, ViewStyle} from "react-native";
import {InitialUserImages} from "@/constants/InitialUserImages";

import MessageFromSomeoneElse from "@/app/components/home/MessageFromSomeoneElse";
import {Fragment} from "react";
import MessageFromSelf from "@/app/components/home/MessageFromSelf";
import MessageObject from "@/app/objects/MessageObject";

type MessageElementProps = {
    userNameForSelf: string;
    message: MessageObject;
}

const MessageElement = ({userNameForSelf, message}: MessageElementProps) => (
    <Fragment key={message.key}>
        {(message.who === userNameForSelf)
            ? <MessageFromSelf text={message.messageText} who={message.who}/>
            : <MessageFromSomeoneElse text={message.messageText} who={message.who}
                                      userImage={InitialUserImages.get(message.who)}/>
        }
    </Fragment>
);

type Props = {
    style: ViewStyle;
    userNameForSelf: string;
    messages: MessageObject[];
};

export default function Body({style, messages, userNameForSelf}: Props) {
    return (
        <FlatList
            inverted // inverting this makes the Flatlist automatically scroll to the bottom
            style={[styles.container, style]}
            data={messages}
            renderItem={({item}) =>
                <MessageElement userNameForSelf={userNameForSelf} message={item}/>
            }
            keyExtractor={(item) => item.key}
        />
    )
}

const styles = StyleSheet.create({
    container: {}
});
