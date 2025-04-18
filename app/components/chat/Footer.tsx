import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    View,
    ViewStyle
} from "react-native";
import {Constants} from "@/constants/Constants";

import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {useState} from "react";
import MessageType from "@/app/objects/MessageType";
import Ionicons from "@expo/vector-icons/Ionicons";
import CaptureImageButtonIcon from "@/app/components/button-icons/CaptureImageButtonIcon";
import TakePhotoButtonIcon from "@/app/components/button-icons/TakePhotoButtonIcon";
import ActionPicker from "@/app/components/chat/ActionPicker";
import FontAwesomeButtonIcon from "../button-icons/FontAwesomeButtonIcon";
import UserData from "@/app/objects/UserData";

type Props = {
    style: ViewStyle;
    userDataForSelf: UserData;
    createNewMessage: (messageText: string, messageType: MessageType) => void;
}
export default function Footer({style, userDataForSelf, createNewMessage}: Readonly<Props>) {
    const [message, setMessage] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

    const handleImageSubmit = (messageText: string, messageType: MessageType) => {
        setIsModalVisible(false);
        createNewMessage(messageText, messageType);
        setMessage("");
    }

    const onModalClose = () => {
        setIsModalVisible(false);
      };

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, style]}>
                <View style={styles.actionButtonContainer}>
                    <FontAwesomeButtonIcon name="plus" onPress={() => setIsModalVisible(true)} />
                </View>
                <TextInput
                    style={styles.input}
                    value={message}
                    placeholder={"Aa"}
                    placeholderTextColor={GreyScaleColorScheme[4]}
                    onChangeText={text => setMessage(text)}
                    onKeyPress={handleKeyPress}
                />
                {message.length > 0 &&
                    <View style={styles.inputSubmitButtonContainer}>
                        <Pressable style={styles.inputSubmitButton} onPress={handleSubmit}>
                            <Ionicons name="arrow-up" size={18} style={styles.inputSubmitIcon}/>
                        </Pressable>
                    </View>
                }
            
            </View>
            <ActionPicker isVisible={isModalVisible} onClose={onModalClose}>
                <TakePhotoButtonIcon userKey={userDataForSelf.key} onPress={onModalClose} label="Take a photo"/>
                <CaptureImageButtonIcon createNewMessage={handleImageSubmit} label="Upload an image"/>
            </ActionPicker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: Constants.generic.padding
    },
    actionButtonContainer: {
        // vertically center the button contained here
        display: 'flex',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        borderColor: Colors.default.color,
        color: Colors.default.color,
        padding: Constants.generic.padding,

        display: 'flex',
        flexDirection: 'row',
    },
    inputSubmitButtonContainer: {
        // vertically center the button contained here
        display: 'flex',
        justifyContent: 'center',
    },
    inputSubmitButton: {
        width: 20,
        height: 20,
        borderRadius: 17,
        backgroundColor: Colors.default.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    inputSubmitIcon: {
        color: Colors.default.color
    },
    modalActionRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: Constants.generic.padding
    }
});