import React, { useCallback, useState } from "react"
import {
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from "react-native"
import { Link, useRouter } from "expo-router"
import { VStack } from "@/components/ui/vstack"
import { SafeAreaView } from "react-native-safe-area-context"
import { HStack } from "@/components/ui/hstack"
import { useSignIn } from "@clerk/clerk-expo"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function LoginForm() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(auth)/(tabs)/home')
      } else {
        Alert.alert("Error", "Log in failed. Please try again.")
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }, [isLoaded, form])

  return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}

          >
            <VStack className="p-6 justify-between flex-1">
              {/* Header Section */}
              <VStack className="mt-8">
                <VStack space="md">
                  <Text className="text-black text-4xl font-OutfitBold">Hey 👋,</Text>
                  <Text className="text-black text-4xl font-OutfitBold">Welcome back</Text>
                </VStack>

                <VStack className="mt-10">
                  <Text className="text-typography-800 text-2xl mb-6 font-Outfit">
                    Login now to track all your expenses
                  </Text>
                </VStack>
              </VStack>

              {/* Form Section */}
              <VStack className="mt-4 flex-1">
                <VStack space="xs" className="mb-4">
                  <Text className="text-typography-700 font-OutfitBold">Email</Text>
                  <TextInput
                      className="border border-primary-300 rounded-xl p-4 focus:border-[#673ab7] focus:border-2"
                      placeholder="Enter your email"
                      onChangeText={(value) => setForm({ ...form, email: value })}
                      value={form.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                  />
                </VStack>

                <VStack space="xs">
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
              <VStack className="mt-auto mt-10">
                <TouchableOpacity
                    className="bg-[#673ab7] w-full p-3 rounded-xl mb-4"
                    onPress={onSignInPress}
                >
                  <Text className="text-center text-2xl font-OutfitBold text-white">
                    Sign In
                  </Text>
                </TouchableOpacity>

                <Link
                    href="/(public)/sign-up"
                    className="text-lg text-center mb-4 font-OutfitBold text-typography-700"
                >
                  Don't have an account?{" "}
                  <Text className="text-[#673ab7] font-OutfitBold">Sign up</Text>
                </Link>
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  )
}