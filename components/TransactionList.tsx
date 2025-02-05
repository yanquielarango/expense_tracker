import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {VStack} from "@/components/ui/vstack";
import {FlashList} from "@shopify/flash-list";
import { Spinner } from './ui/spinner';
import {expenseCategories, incomeCategory} from "@/utils/data";
import Icon from './IconComponent';
import {HStack} from "@/components/ui/hstack";
import Animated, {FadeInDown} from 'react-native-reanimated';


const TransactionList = ({data, title, loading, emptyListMessage} : {data: any, title: string, loading: boolean, emptyListMessage: string} ) => {
    return (
        <VStack className="mt-10">
            {title && (
                <Text className="text-2xl font-OutfitSemibold">{title}</Text>
            )}

           <VStack className="mt-6">
               <FlashList
                   data={data}
                   renderItem={({item, index}) => <TransactionItem index={index} item={item}/>}
                   estimatedItemSize={60}
               />
           </VStack>

            {!loading && data.length == 0 && (
                <Text className="text-lg font-OutfitSemibold text-center mt-10 text-typography-500">{emptyListMessage}</Text>
            )}

            {loading && (
                <VStack className="mt-6">
                    <Spinner size="large"  className='text-blue-600 mt-20'/>
                </VStack>
            )}

        </VStack>
    )
}


const TransactionItem = ({ index, item }: { index: number; item: any }) => {
    let category = expenseCategories["clothing"]

    console.log("catergory",category)
    return (
        <Animated.View entering={FadeInDown.delay(index * 70).springify().damping(14)}>
            <TouchableOpacity onPress={() => {}} className="justify-between   gap-6 mb-2 w-full bg-red-300] p-3 rounded-2xl bg-background-dark/90" >
                <HStack className="gap-2 justify-between items-center">
                        <VStack className="rounded-2xl  p-2" style={{backgroundColor: category.bgColor}}>
                            <Icon
                                name={category?.icon}
                                color="#fff"
                                size={28}
                            />
                        </VStack>

                        <VStack className="flex-1">
                            <Text className="text-white font-OutfitSemibold text-lg">{category.label}</Text>
                            <Text className="text-typography-300 text-base">Paid Wifi bill</Text>
                        </VStack>

                        <VStack className="">
                            <Text className="text-green-500 text-lg">$24</Text>
                            <Text className="text-typography-300 text-base">02 feb</Text>
                        </VStack>

                </HStack>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionList
