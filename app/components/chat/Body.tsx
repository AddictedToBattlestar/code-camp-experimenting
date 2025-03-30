import {FlatList, StyleSheet, ViewStyle} from "react-native";

import {Fragment} from "react";
import MessageObject from "@/app/objects/MessageObject";
import ImageData from "@/app/objects/ImageData";
import Message from "@/app/components/chat/Message";

type Props = {
    style: ViewStyle;
    userNameForSelf: string;
    messages: MessageObject[];
    userImages: Map<string, ImageData>;
};

export default function Body({style, messages, userNameForSelf, userImages}: Props) {
    console.debug(`messages length: ${messages.length}`);
    return (
        <FlatList
            inverted // inverting this makes the Flatlist automatically scroll to the bottom
            style={[styles.container, style]}
            data={messages}
            renderItem={({item}) =>
                <Fragment key={item.key}>
                    <Message
                        userNameForSelf={userNameForSelf}
                        message={item}
                        userImageForMessage={userImages.get(item.who)}
                    />
                </Fragment>
            }
            keyExtractor={(item) => item.key}
        />
    )
}

const styles = StyleSheet.create({
    container: {}
});
