import { VStack } from '@/components/ui/vstack';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';
import {useUserProfile} from "@/hooks/useUserProfile";
import HomeCard from "@/components/HomeCard";
import TransactionList from '@/components/TransactionList';





const Home = () => {
    const {userProfile} = useUserProfile()

  return (
    <SafeAreaView className="flex-1 bg-white">
        <VStack className='p-6  '>
            <HStack className="justify-between">
                <VStack >
                    <Text className="font-Outfit text-xl ">Hello,</Text>
                    <Text className="text-2xl font-OutfitBold mb-2">{userProfile?.firstName}</Text>
                </VStack>

               <TouchableOpacity>
                   <Icon  as={Search} className="h-8 w-8"/>
               </TouchableOpacity>
            </HStack>

            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack className='mt-4'>
                    <HomeCard/>
                </VStack>

                <TransactionList
                    title="Recent Transactions"
                    emptyListMessage="No Transactions added yet"
                    data={[1,2,3,4,5,6,7]}
                    loading={false}
                />
            </ScrollView>
        </VStack>
    </SafeAreaView>
  )
}

export default Home;