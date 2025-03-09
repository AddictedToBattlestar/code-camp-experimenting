import {ScrollView, StyleSheet, ViewStyle} from "react-native";
import {InitialMessages} from "@/constants/InitialMessages";

import ChatMessage from "@/app/components/ChatMessage";
import {Fragment, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatMessageFromSelf from "@/app/components/ChatMessageFromSelf";

type Props = {
    style: ViewStyle;
};

export default function Body({style}: Props) {
    const [userName, setUserName] = useState<string>('');

    const getUserName = async () => {
        try {
            const value = await AsyncStorage.getItem('userName');
            if (value !== null) {
                setUserName(value);
                console.log(`userName: ${value}`);
            }
        } catch (ignoredError) {
            // error reading value
        }
    };

    useEffect(() => {
        getUserName();
    }, []);


    return (
        <ScrollView style={[styles.container, style]}>
            {InitialMessages.map((message) => (
                <Fragment key={message.key}>
                    {(message.who === userName)
                        ? <ChatMessageFromSelf text={message.messageText} who={message.who}/>
                        : <ChatMessage text={message.messageText} who={message.who}/>
                    }
                </Fragment>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
});
