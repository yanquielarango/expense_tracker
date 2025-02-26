import { VStack } from '@/components/ui/vstack';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AddIcon} from '@/components/ui/icon';
import {useUserProfile} from "@/hooks/useUserProfile";
import HomeCard from "@/components/HomeCard";

import {Fab, FabIcon} from "@/components/ui/fab";
import {FlashList} from "@shopify/flash-list";
import {expenseCategories} from "@/utils/data";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {HStack} from "@/components/ui/hstack";
import {TransactionItem} from "@/components/TransactionItem";
import Ionicons from '@expo/vector-icons/Ionicons';



const Home = () => {
    const {userProfile} = useUserProfile()

    const categories = Object.values(expenseCategories)

    console.log(categories)


    return (
    <SafeAreaView className="flex-1 px-4 ">


            <FlashList
                showsVerticalScrollIndicator={false}
                data={categories}
                renderItem={({item, index}) => <TransactionItem key={item.value} index={index} category={item} />}
                estimatedItemSize={50}
                ListHeaderComponent={() => (
                    <VStack  className="mb-10 mt-4">
                        <HStack className="items-center">
                            <Avatar className="" size="lg">
                                <AvatarFallbackText >{userProfile?.firstName}</AvatarFallbackText>
                                <AvatarImage
                                    source={{ uri: userProfile?.imageUrl }}
                                />
                            </Avatar>
                            <VStack  style={{gap: 2, marginLeft: 10}}>
                                <Text style={{ fontSize: 14,  }}>Hello</Text>
                                <Text style={{ fontSize: 20, fontWeight: "600" }}>{userProfile?.firstName}</Text>
                            </VStack>

                            <VStack className="ml-auto">
                                <TouchableOpacity
                                    onPress={() => console.log("Search icon pressed")}
                                >
                                    <Ionicons name="search" size={32} color="#333" />
                                </TouchableOpacity>
                            </VStack>
                        </HStack>

                        <HomeCard/>
                    </VStack>
                )}
            />





            <Fab
                size="lg"
                placement="bottom right"
                className="bg-[#673ab7]"
            >
                <FabIcon as={AddIcon} className="w-7 h-7" />
            </Fab>



    </SafeAreaView>
  )
}

export default Home;