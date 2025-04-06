import {StyleSheet, Text, View} from "react-native";
import {Constants} from "@/constants/Constants";
import {Colors, GreyScaleColorScheme} from "@/constants/Colors";
import UserButtonIcon from "@/app/components/button-icons/UserButtonIcon";

type Props = {
    content: string;
    who: string;
    userProfileImage: string | undefined;
}
export default function MessageFromSomeoneElse({content, who, userProfileImage}: Readonly<Props>) {
    return (
        <View style={styles.container}>
            <View style={styles.userButtonIconContainer}>
                <UserButtonIcon userName={who} userProfileImage={userProfileImage}/>
            </View>
            <View style={styles.messageContainer}>
                <Text style={styles.whoText}>{who}</Text>
                <Text style={styles.messageTextContainer}>
                    {content}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Constants.generic.padding,
        display: "flex",
        flexDirection: "row",
        gap: Constants.generic.padding,
    },
    userButtonIconContainer: {
        display: 'flex',
        justifyContent: "flex-end"
    },
    messageContainer: {
        flexBasis: '80%',
    },
    whoText: {
        color: GreyScaleColorScheme[4]
    },
    messageTextContainer: {
        borderRadius: Constants.generic.borderRadius,
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.tintColor,
        color: Colors.default.color
    }
});
