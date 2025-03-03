import {StyleSheet, TextInput, View} from "react-native";
import { Constants } from "@/constants/Constants";

import { ButtonIcon } from "@/app/components/ButtonIcon";

export function Footer() {
    return (
        <View style={styles.container}>
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