import {NativeSyntheticEvent, StyleSheet, TextInput, TextInputKeyPressEventData, View, ViewStyle} from "react-native";
import {Constants} from "@/constants/Constants";

import PhotoButtonIcon from "@/app/components/chat/PhotoButtonIcon";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {useState} from "react";

type Props = {
    style: ViewStyle;
    createNewMessage: (messageText: string) => void;
}

export default function Footer({style, createNewMessage}: Props) {
    const [message, setMessage] = useState<string>('');

    const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>)=> {
        if (event.nativeEvent.key === "Enter") {
            createNewMessage(message);
            setMessage("");
        }
    }

    return (
        <View style={[styles.container, style]}>
            <PhotoButtonIcon createNewMessage={createNewMessage}/>
            <TextInput
                style={styles.input}
                value={message}
                placeholder={"Aa"}
                placeholderTextColor={GreyScaleColorScheme[4]}
                onChangeText={text => setMessage(text)}
                onKeyPress={handleKeyPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: Constants.generic.padding
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        color: Colors.default.color,
        padding: Constants.generic.padding,
    }
});