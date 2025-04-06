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
                <Stack.Screen name="index" options={{title: 'Setup User Account'}}/>
                {/* <Stack.Screen name="[userKey]" options={{headerShown: false}}/> */}
                <Stack.Screen name="home/[userKey]/chat" options={{title: 'Technology Camp Chat'}}/>
                <Stack.Screen name="home/[userKey]/profile" options={{title: 'User Profile'}}/>
                <Stack.Screen name="home/[userKey]/take-photo" options={{title: 'Take Photo'}}/>
                <Stack.Screen name="+not-found"/>
            </Stack>
        </>
    );
}
