import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Link, useRouter } from "expo-router";
import {  TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () =>  {
  const router = useRouter()

  return (
    <SafeAreaView className="bg-white flex-1   ">
      <VStack >
        <TouchableOpacity className='items-end p-5' onPress={() => router.replace('/(auth)/sign-in')}>
            <Text className="font-OutfitBold">Sign In</Text>
        </TouchableOpacity>

      <Center className="mt-14">
        <Image source={require('@/assets/images/bg.png')} className=" w-full h-[380px]" alt="welcome" />
      </Center>

      <VStack className="items-center" >
        <Box  className="mt-10">
          <Text className="text-black font-OutfitBold text-4xl" >Always take control</Text>
        </Box>
        <Box className="">
          <Text className="text-black text-4xl font-OutfitBold" >of your finances</Text>
        </Box>
        <Box className="mt-5">
          <Text className='text-typography-600 font-OutfitSemibold text-lg' >Finances must be arranged to set a better </Text>
          <Text className='text-typography-600 font-OutfitSemibold text-center text-lg' >lifestyle in future </Text>
        </Box>
      </VStack>

      <Box className="mt-10 items-center px-4 ">
        <TouchableOpacity className="bg-[#0286ff] w-full p-3  rounded-xl" onPress={() => router.replace('/sign-up')}>
          <Text className="text-center text-2xl font-OutfitBold text-white">Get Started</Text>
        </TouchableOpacity>
      </Box>

      </VStack>

    </SafeAreaView>
  );
}

export default  Welcome
