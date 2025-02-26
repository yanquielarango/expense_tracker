import { TouchableOpacity, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {Card} from "@/components/ui/card";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import Icon from "@/components/IconComponent";


type Category = {
    label: string;
    value: string;
    icon: string;
    bgColor: string;
};

type TransactionItemProps = {
    category: Category;
    index: number;
};
export const TransactionItem = ({ index, category}: TransactionItemProps ) => {

  return (
        <Animated.View entering={FadeInDown.delay(index * 70).springify().damping(14)}>
            <TouchableOpacity onPress={() => {}} className="justify-between items-center  "  activeOpacity={0.7}>

                <Card size="sm" variant="outline" className="mb-4 w-full rounded-2xl ">
                    <HStack className="gap-2 ">
                        <VStack className="rounded-lg   p-3 items-center justify-center" style={{backgroundColor: category.bgColor}}>
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