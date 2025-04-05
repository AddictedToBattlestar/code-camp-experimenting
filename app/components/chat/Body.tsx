import {FlatList, StyleSheet, ViewStyle} from "react-native";

import {Fragment} from "react";
import MessageObject from "@/app/objects/MessageObject";
import Message from "@/app/components/chat/Message";
import UserData from "@/app/objects/UserData";

type Props = {
    style: ViewStyle;
    userNameForSelf: string;
    messages: MessageObject[];
    userDataListing: Map<string, UserData>;
};
export default function Body({style, messages, userNameForSelf, userDataListing}: Readonly<Props>) {
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
                        userData={userDataListing.get(item.who)}
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
