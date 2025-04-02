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
                    title: 'Technology Camp Chat'
                }}/>
                <Stack.Screen name="profile" options={{title: 'User Profile'}}/>
                <Stack.Screen name="+not-found"/>
                <Stack.Screen name="take-photo" options={{title: 'Take Photo'}}/>
            </Stack>
            <StatusBar style="light"/>
        </>

    );
}
