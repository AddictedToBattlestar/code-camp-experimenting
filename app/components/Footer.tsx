import {StyleSheet, TextInput, View, ViewStyle} from "react-native";
import {Constants} from "@/constants/Constants";

import ButtonIcon from "@/app/components/ButtonIcon";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import {useState} from "react";

type Props = {
    style: ViewStyle;
}

export default function Footer({style}: Props) {
    const [message, setMessage] = useState<string>('');

    return (
        <View style={[styles.container, style]}>
            <ButtonIcon/>
            <TextInput
                style={styles.input}
                value={message}
                placeholder={"Aa"}
                placeholderTextColor={GreyScaleColorScheme[4]}
                onChangeText={text => setMessage(text)}
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