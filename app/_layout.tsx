import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false,
                    title: 'Home'
                }}/>
                <Stack.Screen name="+not-found"/>
                <Stack.Screen name="take-photo" options={{title: 'Take Photo'}}/>
            </Stack>
            <StatusBar style="light"/>
        </>

    );
}
