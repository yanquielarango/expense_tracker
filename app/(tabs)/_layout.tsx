import { Tabs } from "expo-router"
import {View, Image, Text, TouchableOpacity} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useUserProfile} from "@/hooks/useUserProfile";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {TabBar} from "@/components/TabBar";

export default function TabsLayout() {
    const {userProfile} = useUserProfile()
    return (
        <Tabs  tabBar={props => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                    fontFamily: "Outfit-Medium",
                },


            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Home",
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        shadowColor: "transparent",
                    },
                    headerLeft: () => (
                        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 14 }}>
                            <Avatar className="" size="lg">
                                <AvatarFallbackText >{userProfile?.firstName}</AvatarFallbackText>
                                <AvatarImage
                                    source={{ uri: userProfile?.imageUrl }}
                                />
                            </Avatar>
                           <View  style={{padding: 10}}>
                               <Text style={{ fontSize: 14,  }}>Hello</Text>
                               <Text style={{ fontSize: 20, fontWeight: "600" }}>{userProfile?.firstName}</Text>
                           </View>
                        </View>
                    ),

                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => console.log("Search icon pressed")}
                            style={{ marginHorizontal: 16, marginTop: 14}}
                        >
                            <Ionicons name="search" size={32} color="#333" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    tabBarLabel: "Stats"

                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    tabBarLabel: "Wallet"
                }}

            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Profile"
                }}
            />
        </Tabs>
    )
}

