import {FlatList, ScrollView, StyleSheet, ViewStyle} from "react-native";
import {InitialMessages} from "@/constants/InitialMessages";
import {InitialUserImages} from "@/constants/InitialUserImages";

import Message from "@/app/components/home/Message";
import {Fragment, useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageFromSelf from "@/app/components/home/MessageFromSelf";
import {useFocusEffect} from "expo-router";
import MessageObject from "@/app/objects/MessageObject";

type Props = {
    style: ViewStyle;
    userNameForSelf: string;
    messages: MessageObject[];
};

type ItemProps = {
    userNameForSelf: string;
    message: MessageObject;
}

const Item = ({userNameForSelf, message}: ItemProps) => (
    <Fragment key={message.key}>
        {(message.who === userNameForSelf)
            ? <MessageFromSelf text={message.messageText} who={message.who}/>
            : <Message text={message.messageText} who={message.who}
                       userImage={InitialUserImages.get(message.who)}/>
        }
    </Fragment>
);

export default function Body({style, messages, userNameForSelf}: Props) {
    return (
        <FlatList
            style={[styles.container, style]}
            data={messages}
            renderItem={({item}) => <Item userNameForSelf={userNameForSelf} message={item} />}
            keyExtractor={(item) => item.key}
        />
    )
}

const styles = StyleSheet.create({
    container: {}
});
