import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {VStack} from "@/components/ui/vstack";
import {FlashList} from "@shopify/flash-list";
import { Spinner } from './ui/spinner';
import {expenseCategories, incomeCategory} from "@/utils/data";
import Icon from './IconComponent';
import {HStack} from "@/components/ui/hstack";
import Animated, {FadeInDown} from 'react-native-reanimated';

import {Heading} from "@/components/ui/heading";
import { Card } from '@/components/ui/card';


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
            <TouchableOpacity onPress={() => {}} className="justify-between items-center  "  activeOpacity={0.7}>

                    <Card size="sm" variant="outline" className="mb-4 w-full rounded-2xl ">
                        <HStack className="gap-2 ">
                            <VStack className="rounded-full   p-3 items-center justify-center" style={{backgroundColor: category.bgColor}}>
                                <Icon
                                    name={category?.icon}
                                    color="#fff"
                                    size={28}
                                />

                            </VStack>
                            <VStack className="gap-1 flex-1">
                                <Text className="text-lg">{category.label}</Text>
                                <Text className="text-base">Paid with bill</Text>
                            </VStack>

                            <VStack className="gap-1 ">
                                <Text className="text-lg text-green-500">$25</Text>
                                <Text className="text-base">12 Jun</Text>
                            </VStack>
                        </HStack>



                    </Card>


            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionList
