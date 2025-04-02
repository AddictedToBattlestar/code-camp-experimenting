import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Colors} from "@/constants/Colors";

export default function RootLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.default.primaryColor,
                    },
                    headerShadowVisible: false,
                    headerTintColor: Colors.default.color
                }}
            >
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
