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
                <Stack.Screen name="index" options={{
                    title: 'Setup User Account'
                }}/>
                <Stack.Screen name="home"options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
            </Stack>
            <StatusBar style="light"/>
        </>
    );
}
