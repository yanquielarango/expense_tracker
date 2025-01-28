import React, {useCallback, useState} from "react"
import {Alert, TouchableOpacity, Text} from "react-native"
import { Link, useRouter } from "expo-router"
import { VStack } from "@/components/ui/vstack";
// import { Input, InputField, InputIcon } from "@/components/ui/input"
import { SafeAreaView } from "react-native-safe-area-context"
import { HStack } from "@/components/ui/hstack";
import {useSignIn } from "@clerk/clerk-expo";
import InputField from "@/components/InputField";
import {Lock, Mail} from "lucide-react-native";

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

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)/home')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err:any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
      }

  }, [isLoaded, form])





  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack  className="p-4" >


        <VStack className="mt-8" >
            <VStack space="md" className="">
              <Text className="text-black  text-4xl font-JakartaBold" >Hey 👋,</Text>
              <Text className="text-black text-4xl font-JakartaBold" >Welcome back</Text>
            </VStack>

            <VStack className="mt-10">
              <Text className="text-typography-800 text-2xl mb-6 font-Jakarta">Login now to tack all your expenses</Text>
            </VStack>


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
          

          <TouchableOpacity className="bg-[#0286ff] w-full p-3 rounded-full mt-14" onPress={ onSignInPress }>
              <Text className="text-center text-2xl font-JakartaBold text-white">Sign In</Text>
          </TouchableOpacity>

          <HStack className="justify-center items-center mt-8" space="md">
            <Text className="text-black font-JakartaSemiBold ">Don't have an account?</Text>
            <Link  href='/(auth)/sign-up' className="text-[#0286ff] font-JakartaSemiBold">Sign up</Link>
          </HStack>

        </VStack>
      </VStack>
    </SafeAreaView>
  )
}

