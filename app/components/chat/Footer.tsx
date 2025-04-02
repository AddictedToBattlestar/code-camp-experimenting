import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    TextInput,
    TextInputKeyPressEventData,
    View,
    ViewStyle
} from "react-native";
import {Constants} from "@/constants/Constants";

import PhotoButtonIcon from "@/app/components/button-icons/PhotoButtonIcon";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {useState} from "react";
import MessageType from "@/app/objects/MessageType";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    style: ViewStyle;
    createNewMessage: (messageText: string, messageType: MessageType) => void;
}
export default function Footer({style, createNewMessage}: Readonly<Props>) {
    const [message, setMessage] = useState<string>('');

    const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === "Enter") {
            createNewMessage(message, MessageType.Text);
            setMessage("");
        }
    }

    const handleSubmit = () => {
        createNewMessage(message, MessageType.Text);
        setMessage("");
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.actionButton}>
                <PhotoButtonIcon/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    placeholder={"Aa"}
                    placeholderTextColor={GreyScaleColorScheme[4]}
                    onChangeText={text => setMessage(text)}
                    onKeyPress={handleKeyPress}
                />
                {message.length > 0 &&
                    <Pressable style={styles.inputSubmitButton} onPress={handleSubmit}>
                        <Ionicons name="arrow-up" size={18} style={styles.inputSubmitIcon}/>
                    </Pressable>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: Constants.generic.padding
    },
    actionButton: {
        display: 'flex',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        color: Colors.default.color,
        padding: Constants.generic.padding,

        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
    },
    inputSubmitButton: {
        width: 25,
        height: 25,
        borderRadius: 17,
        backgroundColor: Colors.default.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    inputSubmitIcon: {
        color: Colors.default.color
    }
});