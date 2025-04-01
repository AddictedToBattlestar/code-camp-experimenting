import {StyleSheet, View} from "react-native";
import {Href, Link, Stack} from 'expo-router';

export default function NotFoundScreen() {
    const rootRoute = "/" as Href;
    return (
        <>
            <Stack.Screen options={{title: 'Oops! Not Found'}}/>
            <View style={styles.container}>
                <Link href={rootRoute} style={styles.button}>
                    Go back to home screen!
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
})