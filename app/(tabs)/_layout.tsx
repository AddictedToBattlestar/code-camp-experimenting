import {Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "@/constants/Colors";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.default.tintColor,
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
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
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