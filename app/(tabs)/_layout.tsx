import {Tabs} from "expo-router";
import {Colors} from "@/constants/Colors";

import Ionicons from '@expo/vector-icons/Ionicons';
/*
Note: 
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "Ionicons")

The Expo Go <FontAwesome/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "FontAwesome")

Reference: https://docs.expo.dev/guides/icons/
*/

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.default.primaryColor,
                headerStyle: {
                    backgroundColor: Colors.default.backgroundColor,
                },
                headerShadowVisible: false,
                headerTintColor: Colors.default.color,
                tabBarStyle: {
                    backgroundColor: Colors.default.backgroundColor,
                },
            }}
        >
            <Tabs.Screen
                // "index" is a reserved name to indicate the default route to present in the application
                name="index"
                options={{
                    title: 'Technology Camp Chat',
                    tabBarLabel: "chat",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'} color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'User Profile',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>
                    ),
                }}
            />
        </Tabs>
    )
}