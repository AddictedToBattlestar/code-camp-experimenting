import {ScrollView, StyleSheet, ViewStyle} from "react-native";
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
    messages: MessageObject[];
};

export default function Body({style, messages}: Props) {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('userName');
        } catch (ignoredError) {
            return null;
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.debug('This route is now focused');

            getUserName().then((value) => {
                if (value !== null) {
                    setUserName(value);
                    console.debug(`userName: ${value}`);
                }
            });
            return () => {
                console.debug('This route is now unfocused.');
            };
        }, [])
    );

    return (
        <ScrollView style={[styles.container, style]}>
            {messages.map((message) => (
                <Fragment key={message.key}>
                    {(message.who === userName)
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
