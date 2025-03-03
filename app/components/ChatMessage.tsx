import {StyleSheet, Text, View} from "react-native";
import { Constants } from "@/constants/Constants";


type Props = {
    text: string;
}


export function ChatMessage({ text }: Props) {
    return (
        <Text style={styles.container}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderWidth: 1,
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
    }
})