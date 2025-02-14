import { Tabs } from "expo-router"
import { Home, Wallet,LayoutGrid ,ChartNoAxesCombined , User } from "lucide-react-native"

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopColor: "#262626",
                    height: 60,
                    paddingVertical: 5,


                },
                // tabBarActiveTintColor: "#0286ff",
                // tabBarInactiveTintColor: "#a3a3a3",
                tabBarActiveTintColor: "#0d579b",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                    fontFamily: "Outfit-Medium",

                },
                tabBarIconStyle: {
                    marginBottom: 2,
                },

            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => <Home  size={24} color={color} />,
                    tabBarLabel: "Home"

                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    tabBarIcon: ({ color }) => <ChartNoAxesCombined  size={24} color={color} />,
                    tabBarLabel: "Stats"

                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    tabBarIcon: ({ color }) => <Wallet size={24} color={color} />,
                    tabBarLabel: "Wallet"
                }}

            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                    tabBarLabel: "Profile"
                }}
            />
        </Tabs>
    )
}

