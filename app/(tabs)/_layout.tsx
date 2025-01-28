import { Tabs } from "expo-router"
import { Home, WalletCards, Clock, User } from "lucide-react-native"

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#171717",
                    borderTopColor: "#262626",
                    height: 60,
                },
                tabBarActiveTintColor: "#0286ff",
                tabBarInactiveTintColor: "#a3a3a3",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                    tabBarLabel: "Home",
                    animation: "fade"
                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    tabBarIcon: ({ color }) => <WalletCards size={24} color={color} />,
                    tabBarLabel: "Expenses",
                    animation: 'fade'
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    tabBarIcon: ({ color }) => <Clock size={24} color={color} />,
                    tabBarLabel: "History",
                    animation: 'fade'
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                    tabBarLabel: "Profile",
                    animation: 'fade'
                }}
            />
        </Tabs>
    )
}

