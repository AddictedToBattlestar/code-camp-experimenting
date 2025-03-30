import {Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "@/constants/Colors";

/*
Note: 
The Expo Go <Ionicons/> built-in component uses icons found at:
https://icons.expo.fyi/Index
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
                name="index"
                options={{
                    headerShown: false,
                    tabBarLabel: "chat",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'} color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>
                    ),
                }}
            />
        </Tabs>
    )
}