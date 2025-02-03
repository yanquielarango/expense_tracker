import React, { useState } from "react"
import {Alert, TouchableOpacity, Text, ScrollView} from "react-native"
import {useSignUp, useUser} from "@clerk/clerk-expo";
import {ReactNativeModal} from "react-native-modal";

import { EyeIcon, EyeOffIcon} from "lucide-react-native";
import {Link, router} from "expo-router";
import { VStack } from "@/components/ui/vstack";


import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { OtpInput } from 'react-native-otp-entry';
import {useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";






export default function Signup() {
  const createUser = useMutation(api.users.createUser)
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {user} = useUser()


  const [showPassword, setShowPassword] = useState(false)



  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

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
    if (!isLoaded) return
    try {
      console.log("Attempting verification with code:", verification.code)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })
      if (completeSignUp.status !== "complete") {
        console.log("Verification not complete")
        throw new Error("Verification failed")
      }

      await createUser({
        firstName: form.name,
        email: form.email,
        clerkId: completeSignUp.createdUserId ?? '',

      })

      await setActive({ session: completeSignUp.createdSessionId })
      console.log("Session set active")
      setVerification({
        ...verification,
        state: "success",
        error: "",
      })
      setShowSuccessModal(true)
    } catch (err: any) {
      console.log("Verification error:", JSON.stringify(err, null, 2))
      setVerification({
        ...verification,
        error: err.errors?.[0].longMessage || "Verification failed. Please try again.",
        state: "failed",
      })
    }
  }

  const resendVerificationCode = async () => {
    if (!isLoaded) return
    try {
      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" })
      Alert.alert("Success", "Verification code resent. Please check your email.")
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2))
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }

  return (

      <ScrollView className="flex-1 bg-white">
        <VStack  className="p-6" >

          <VStack className="mt-14" >


            <VStack space="md" className="">
              <Text className="text-black font-JakartaBold  text-5xl" >Let's,</Text>
              <Text className="text-black  font-JakartaBold text-5xl" >Get Started</Text>
            </VStack>

            <VStack className="mt-6">
              <Text  className="text-black mb-3 font-Jakarta text-xl">Create an account to track your expenses</Text>
            </VStack>



            <VStack className="">

              <VStack space="xs" className='mt-4 mb-4'>
                <Text className="text-typography-700 font-JakartaBold">Name</Text>
                <Input className="min-w-[250px]" size="xl" >
                  <InputField type="text"  className='rounded-2xl' placeholder="Enter your name" onChangeText={(value) => setForm({ ...form, name: value })}  value={form.name} />
                </Input>
              </VStack>
              <VStack space="xs" className='mb-4'>
                <Text className="text-typography-700 font-JakartaBold">Email</Text>
                <Input className="min-w-[250px]" size="xl">
                  <InputField type="text"  placeholder="Enter your  email"  onChangeText={(value) => setForm({ ...form, email: value })} value={form.email}/>
                </Input>
              </VStack>
              <VStack space="xs">
                <Text className="text-typography-700 font-JakartaBold">Password</Text>
                <Input className="text-typography-700 " size="xl">
                  <InputField type={showPassword ? "text" : "password"}  placeholder="Enter your password" onChangeText={(value) => setForm({ ...form, password: value })} value={form.password}/>
                  <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)} >
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              </VStack>


              <TouchableOpacity className="bg-[#0286ff] w-full p-3 rounded-xl mt-8" onPress={() => onSignUpPress() }>
                <Text className="text-center text-2xl text-white font-JakartaBold">Sign Up</Text>
              </TouchableOpacity>
              <Link
                  href="/(auth)/sign-in"
                  className="text-lg text-center text-general-200  mt-5"
              >
                Already have an account?{" "}
                <Text className="text-[#0286ff] font-JakartaBold">Log In</Text>
              </Link>
            </VStack>

           

          </VStack>


          <ReactNativeModal
              isVisible={verification.state === "pending" || verification.state === "failed"}
              onModalHide={() => {
                if (verification.state === "success") {
                  setShowSuccessModal(true)
                }
              }}
          >
            <VStack className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="font-JakartaExtraBold text-2xl mb-2">
                Verification
              </Text>
              <Text className="font-Jakarta ">
                We've sent a verification code to:
              </Text>
              <Text className=" font-JakartaBold mb-6">{form.email}</Text>

              <OtpInput
                  onTextChange={(code) => setVerification({ ...verification, code })}
                  secureTextEntry={false}
                  numberOfDigits={6}
                  autoFocus={true}
                  focusStickBlinkingDuration={500}
              />

              {verification.error && <Text className="text-red-500 text-lg mt-2 font-Jakarta ">{verification.error}</Text>}
              <TouchableOpacity className="bg-[#16a34a] w-full p-3 rounded-full mt-8" onPress={onPressVerify}>
                <Text className="text-center text-xl text-white font-bold">Verify Email</Text>
              </TouchableOpacity>

              <HStack  space="sm" className="mt-4">
                <Text className="text-general-200 font-Jakarta">
                  Didn't receive the code?
                </Text>
                <TouchableOpacity  onPress={resendVerificationCode}>
                  <Text className="text-[#1063FD] font-JakartaBold">Resend</Text>
                </TouchableOpacity>
              </HStack>

            </VStack>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <VStack className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image source={require('@/assets/images/check.png')} className="w-[100px] h-[100px] mx-auto my-5"/>
              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>
              <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                You have successfully verified your account.
              </Text>
              <TouchableOpacity className="bg-[#171717] w-full p-3 rounded-full mt-8" onPress={() => router.push('/(tabs)/home') }>
                <Text className="text-center text-2xl text-white font-bold">Browse Home</Text>
              </TouchableOpacity>
            </VStack>
          </ReactNativeModal>

        </VStack>
      </ScrollView>
  )
}

