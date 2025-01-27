import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link, useRouter } from "expo-router";
import {  TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const router = useRouter()

  return (
    <SafeAreaView className="bg-[#171717] flex-1 p-4  ">
      <VStack >
        <Link href='/(auth)/sign-in' className="color-white  self-end text-xl">Sign in</Link>

      <Center className="mt-20">
        <Image source={require('@/assets/images/welcome.png')}  className=" w-96 h-80"/>
      </Center>

      <VStack className="items-center" >
        <Box  className="mt-10">
          <Heading className="color-white" size="3xl">Always take control</Heading>
        </Box>
        <Box className="mt-2">
          <Heading className="color-white" size="3xl">of your finances</Heading>
        </Box>
        <Box className="mt-7">
          <Text className='color-white' size='xl'>Finances must be arranged to set a better </Text>
          <Text className='color-white text-center' size='xl'>lifestyle in future </Text>
        </Box>
      </VStack>

      <Box className="mt-10 items-center ">
        <TouchableOpacity className="bg-[#a3e635] w-full p-4 rounded-full" onPress={() => router.replace('/(auth)/sign-up')}>
          <Text className="text-center text-2xl font-bold text-black">Get Started</Text>
        </TouchableOpacity>
      </Box>

      </VStack>

    </SafeAreaView>
  );
}
