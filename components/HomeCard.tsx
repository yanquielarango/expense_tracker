import {View, Text, ImageBackground} from 'react-native'
import React from 'react'
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Icon} from "@/components/ui/icon";
import {Ellipsis, MoveDown, MoveUp} from "lucide-react-native";

const HomeCard = () => {
    return (
       <ImageBackground  source={require('../assets/images/card.png')} className='h-[200px] w-full mt-10' resizeMode="stretch"  >
            <VStack className='w-full h-[200px] px-6 py-4'>
                <VStack >
                    <HStack className="justify-between items-center ">
                        <Text className="font-OutfitSemibold text-lg">Total Balance</Text>
                        <Icon as={Ellipsis} className="font-OutfitSemibold"/>
                    </HStack>
                    <Text className="text-3xl font-OutfitBold mt-2">$2345.65</Text>
                </VStack>


                    <VStack className="mt-8">
                       <HStack className="justify-between items-center ">
                           <VStack>
                               <HStack className='justify-space-between items-center gap-2'>
                                   <VStack className=" bg-[#CCCCCC] rounded-full p-1">
                                       <Icon  as={MoveDown} className="font-OutfitSemibold "/>
                                   </VStack>
                                   <Text className="text-lg mb-2">Income</Text>
                               </HStack>
                               <Text className='text-center font-OutfitBold text-xl text-green-600'>$2340</Text>
                           </VStack>


                           <VStack>
                               <HStack className='justify-space-between items-center gap-2'>
                                   <VStack className="bg-[#CCCCCC] rounded-full p-1">
                                       <Icon  as={MoveUp} className="font-OutfitSemibold "/>
                                   </VStack>
                                   <Text className="text-lg mb-2" >Expense</Text>
                               </HStack>
                               <Text className='text-center text-red-600 font-OutfitBold text-xl'>$2140</Text>
                           </VStack>
                       </HStack>
                    </VStack>

            </VStack>
       </ImageBackground>
    )
}
export default HomeCard
