import { VStack } from '@/components/ui/vstack';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from 'react-native';
import {AddIcon} from '@/components/ui/icon';
import {useUserProfile} from "@/hooks/useUserProfile";
import HomeCard from "@/components/HomeCard";
import TransactionList from '@/components/TransactionList';
import {Fab, FabIcon} from "@/components/ui/fab";





const Home = () => {
    const {userProfile} = useUserProfile()

  return (
    <SafeAreaView className="flex-1 bg-white">
        <VStack className='px-4'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack className=''>
                    <HomeCard/>
                </VStack>

                <TransactionList
                    title="Recent Transactions"
                    emptyListMessage="No Transactions added yet"
                    data={[1,2,3,4,5,6,7,8,9,10,11]}
                    loading={false}
                />
            </ScrollView>


        </VStack>

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