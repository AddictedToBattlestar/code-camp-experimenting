import {FlatList, StyleSheet, ViewStyle} from "react-native";

import MessageFromSomeoneElse from "@/app/components/chat/MessageFromSomeoneElse";
import {Fragment} from "react";
import MessageFromSelf from "@/app/components/chat/MessageFromSelf";
import MessageObject from "@/app/objects/MessageObject";
import ImageData from "@/app/objects/ImageData";

type MessageElementProps = {
    userNameForSelf: string;
    message: MessageObject;
    userImageForMessage: ImageData | undefined;
}

const MessageElement = ({userNameForSelf, message, userImageForMessage}: MessageElementProps) => (
    <Fragment key={message.key}>
        {(message.who === userNameForSelf)
            ? <MessageFromSelf text={message.messageText} who={message.who}/>
            : <MessageFromSomeoneElse text={message.messageText} who={message.who}
                                      userImage={userImageForMessage}/>
        }
    </Fragment>
);

type Props = {
    style: ViewStyle;
    userNameForSelf: string;
    messages: MessageObject[];
    userImages: Map<string, ImageData>;
};

export default function Body({style, messages, userNameForSelf, userImages}: Props) {
    return (
        <FlatList
            inverted // inverting this makes the Flatlist automatically scroll to the bottom
            style={[styles.container, style]}
            data={messages}
            renderItem={({item}) =>
                <MessageElement 
                    userNameForSelf={userNameForSelf} 
                    message={item}
                    userImageForMessage={userImages.get(item.who)}
                />
            }
            keyExtractor={(item) => item.key}
        />
    )
}

const styles = StyleSheet.create({
    container: {}
});
