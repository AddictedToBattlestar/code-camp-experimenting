import { StyleSheet } from 'react-native';
import { Text, View } from "react-native";

const HEADER_HEIGHT = 75;
const FOOTER_HEIGHT = 75;

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
            <Text>Chat Header</Text>
        </View>
        <View style={style.chatBody}>
            <Text>Chat Body</Text>
        </View>
        <View style={style.chatFooter}>
            <Text>Chat Footer</Text>
        </View>

    </View>
  );
}

const style = StyleSheet.create({
    chatHeader: {
        height: HEADER_HEIGHT,
        backgroundColor: 'lightblue',
    },
    chatBody: {
        flex: 1,
        backgroundColor: 'lightgreen',
    },
    chatFooter: {
        height: FOOTER_HEIGHT,
        backgroundColor: 'lightblue',
    }
});
