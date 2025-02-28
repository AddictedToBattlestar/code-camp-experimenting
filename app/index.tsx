import {StyleSheet, View} from "react-native";

import {Body} from './components/Body';
import {Footer} from './components/Footer';
import {Header} from './components/Header';

const HEADER_HEIGHT = 75;
const FOOTER_HEIGHT = 75;
const PADDING = 8;

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={style.chatHeader}>
                <Header/>
            </View>
            <View style={style.chatBody}>
                <Body/>
            </View>
            <View style={style.chatFooter}>
                <Footer/>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    chatHeader: {
        height: HEADER_HEIGHT,
        width: '100%',
        padding: PADDING,
        backgroundColor: 'lightblue',
    },
    chatBody: {
        flex: 1,
        width: '100%',
        padding: PADDING,
        backgroundColor: 'lightgreen',
    },
    chatFooter: {
        height: FOOTER_HEIGHT,
        width: '100%',
        padding: PADDING,
        backgroundColor: 'lightblue',
    }
});
