import {StyleSheet, View} from "react-native";
import { Constants } from "@/constants/Constants";

import {Body} from '@/app/components/Body';
import {Footer} from '@/app/components/Footer';
import {Header} from '@/app/components/Header';



export default function Index() {
    return (
        <View
            style={styles.container}
        >
            <Header style={styles.chatHeader}/>
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
    },
    chatHeader: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: 'lightblue',
    },
    chatBody: {
        flex: 1,
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: 'lightgreen',
    },
    chatFooter: {
        width: '100%',
        padding: Constants.generic.padding,
        backgroundColor: 'lightblue',
    }
});
