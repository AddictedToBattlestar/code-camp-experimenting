import {StyleSheet, TextInput, View, ViewStyle} from "react-native";
import { Constants } from "@/constants/Constants";

import { ButtonIcon } from "@/app/components/ButtonIcon";

type Props = {
    style: ViewStyle;
}

export function Footer({style}: Props) {
    return (
        <View style={[styles.container, style]}>
            <ButtonIcon/>
            <TextInput
                style={styles.input}
                value={""}
                placeholder={"Message"}
                onChangeText={text => console.log(`Footer.TextInput.onChangeText: ${text}`)}
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
        padding: Constants.generic.padding,
    }
});