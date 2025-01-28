import React, { useState } from "react"
import {Alert, TouchableOpacity, Text} from "react-native"
import {useSignUp} from "@clerk/clerk-expo";
import {ReactNativeModal} from "react-native-modal";

import {  Mail, User, Lock  } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "@/components/ui/box";
import { Divider } from '@/components/ui/divider';
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";





export default function Signup() {
  const {isLoaded, signUp, setActive} = useSignUp()

  const router = useRouter()

  const [form, setForm] = useState({
    name:"",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showPassword, setShowPassword] = useState(false)


  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };


  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack  className="p-4" >

        <VStack className="mt-8" >


            <VStack space="md" className="">
              <Text className="text-black font-JakartaBold  text-5xl" >Let's,</Text>
              <Text className="text-black  font-JakartaBold text-5xl" >Get Started</Text>
            </VStack>

            <VStack className="mt-6">
              <Text  className="text-black mb-3 font-Jakarta text-xl">Create an account to track your expenses</Text>
            </VStack>



          <VStack className="p-5">
            <InputField
                label="Name"
                placeholder="Enter name"
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
                icon={User}
            />
            <InputField
                label="Email"
                placeholder="Enter email"
                textContentType="emailAddress"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
                icon={Mail}
            />
            <InputField
                label="Password"
                placeholder="Enter password"
                secureTextEntry={true}
                textContentType="password"
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                icon={Lock}
            />
            <TouchableOpacity className="bg-[#0286ff] w-full p-3 rounded-full mt-8" onPress={() => onSignUpPress() }>
              <Text className="text-center text-2xl text-white font-JakartaBold">Sign Up</Text>
            </TouchableOpacity>
            <Link
                href="/(public)/sign-in"
                className="text-lg text-center text-general-200  mt-5"
            >
              Already have an account?{" "}
              <Text className="text-[#0286ff] font-JakartaBold">Log In</Text>
            </Link>
          </VStack>


          <HStack className=" justify-center items-center gap-4">
              <Divider orientation="horizontal" className="flex-1"/>
              <Text className="">Or</Text>
              <Divider orientation="horizontal" className="flex-1 "/>
          </HStack>

          <VStack className="px-5">
              <TouchableOpacity   className="border-2 border-typography-300 p-3 rounded-full mt-4 flex-row justify-center items-center gap-3" >
                <Image source={require('@/assets/images/google.png')} className="h-8 w-8"/>
                <Text className="text-center text-black text-xl font-JakartaBold">Sign with Google</Text>
              </TouchableOpacity>
          </VStack>

        </VStack>


        <ReactNativeModal
            isVisible={verification.state === "pending"} onModalHide={() => setVerification({...verification, state: "success"})}
        >
          <VStack className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
                label={"Code"}
                icon={Lock}
                placeholder={"12345"}
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) =>
                    setVerification({ ...verification, code })
                }
            />
            {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
            )}
            <TouchableOpacity className="bg-[#16a34a] w-full p-3 rounded-full mt-8" onPress={onPressVerify }>
              <Text className="text-center text-xl text-white font-bold">Verify Email</Text>
            </TouchableOpacity>

          </VStack>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <VStack className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={require('@/assets/images/check.png')} className="w-[100px] h-[100px] mx-auto my-5"/>
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <TouchableOpacity className="bg-[#171717] w-full p-3 rounded-full mt-8" onPress={() => router.replace('/(auth)/(tabs)/home') }>
              <Text className="text-center text-2xl text-white font-bold">Browse Home</Text>
            </TouchableOpacity>
          </VStack>
        </ReactNativeModal>

      </VStack>
    </SafeAreaView>
  )
}

