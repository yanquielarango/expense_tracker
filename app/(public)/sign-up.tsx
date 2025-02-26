import React, { useState } from "react"
import {Alert, TouchableOpacity, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform} from "react-native"
import {useSignUp, useUser} from "@clerk/clerk-expo";
import {ReactNativeModal} from "react-native-modal";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Link, router} from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { OtpInput } from 'react-native-otp-entry';
import {useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import {SafeAreaView} from "react-native-safe-area-context";





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
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };


  const onPressVerify = async () => {
    if (!isLoaded) return
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })
      if (completeSignUp.status !== "complete") {
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
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }

  return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}

          >
            <VStack className="p-6 justify-between flex-1">
              {/* Header Section */}
              <VStack className="mt-8">
                <VStack space="md">
                  <Text className="text-black font-OutfitBold text-5xl">Let's,</Text>
                  <Text className="text-black font-OutfitBold text-5xl">Get Started</Text>
                </VStack>

                <VStack className="mt-6">
                  <Text className="text-black mb-3 font-Outfit text-xl">
                    Create an account to track your expenses
                  </Text>
                </VStack>
              </VStack>

              {/* Form Section */}
              <VStack className="mt-4 flex-1">
                <VStack space="xs" className="mb-4">
                  <Text className="text-typography-700 font-OutfitBold">Name</Text>
                  <TextInput
                      className="border border-primary-300 rounded-xl p-4 focus:border-[#673ab7] focus:border-2"
                      placeholder="Enter your name"
                      onChangeText={(value) => setForm({ ...form, name: value })}
                      value={form.name}
                  />
                </VStack>

                <VStack space="xs" className="mb-4">
                  <Text className="text-typography-700 font-OutfitBold">Email</Text>
                  <TextInput
                      className="border border-primary-300 rounded-xl p-4 focus:border-[#673ab7] focus:border-2"
                      placeholder="Enter your email"
                      onChangeText={(value) => setForm({ ...form, email: value })}
                      value={form.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                  />
                </VStack>

                <VStack space="xs" className="mb-4">
                  <Text className="text-typography-700 font-OutfitBold">Password</Text>
                  <VStack>
                    <TextInput
                        className=" border border-primary-300  rounded-xl p-4  focus:border-[#673ab7] focus:border-2 "
                        placeholder="Enter your password"  onChangeText={(value) => setForm({ ...form, password: value })} value={form.password}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        className="absolute right-4 top-4"
                        onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                          name={showPassword ? "eye" : "eye-off"}
                          size={24}
                          color="#673ab7"
                      />
                    </TouchableOpacity>
                  </VStack>
                </VStack>
              </VStack>

              {/* Bottom Section */}
              <VStack className="mt-auto pt-4">
                <TouchableOpacity
                    className="bg-[#673ab7] w-full p-3 rounded-xl mb-4"
                    onPress={onSignUpPress}
                >
                  <Text className="text-center text-2xl text-white font-OutfitBold">
                    Sign Up
                  </Text>
                </TouchableOpacity>

                <Link
                    href="/(public)/sign-in"
                    className="text-lg text-center mb-4 font-OutfitBold text-typography-700"
                >
                  Already have an account?{" "}
                  <Text className="text-[#673ab7] font-OutfitBold">Log In</Text>
                </Link>
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Modals remain the same */}

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
            <TouchableOpacity className="bg-[#171717] w-full p-3 rounded-full mt-8" onPress={() => router.push('/(auth)/(tabs)/home') }>
              <Text className="text-center text-2xl text-white font-bold">Browse Home</Text>
            </TouchableOpacity>
          </VStack>
        </ReactNativeModal>

      </SafeAreaView>
  )
}

