import {StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

import Body from '@/app/components/home/Body';
import Footer from '@/app/components/home/Footer';
import Header from '@/app/components/Header';

export default function Index() {
    return (
        <View
            style={styles.container}
        >
            <Header style={styles.chatHeader} text={"Technology Camp Chat"}/>
            <Body style={styles.chatBody}/>
            <Footer style={styles.chatFooter}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.backgroundColor,
        color: Colors.default.color
    },
    chatHeader: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.primaryColor,
        color: Colors.default.color
    },
    chatBody: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
    },
    chatFooter: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: Colors.default.backgroundColor
    }
});
