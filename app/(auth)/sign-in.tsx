import React, {useCallback, useState} from "react"
import {Alert, TouchableOpacity, Text} from "react-native"
import { Link, useRouter } from "expo-router"
import { VStack } from "@/components/ui/vstack";
// import { Input, InputField, InputIcon } from "@/components/ui/input"
import { SafeAreaView } from "react-native-safe-area-context"
import { HStack } from "@/components/ui/hstack";
import {useSignIn } from "@clerk/clerk-expo";
import { EyeIcon, EyeOffIcon} from "lucide-react-native";
import {Input, InputIcon, InputSlot, InputField} from "@/components/ui/input";

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
      <VStack  className="p-6" >


        <VStack className="mt-8" >
            <VStack space="md" className="">
              <Text className="text-black  text-4xl font-OutfitBold" >Hey 👋,</Text>
              <Text className="text-black text-4xl font-OutfitBold" >Welcome back</Text>
            </VStack>

            <VStack className="mt-10">
              <Text className="text-typography-800 text-2xl mb-6 font-Outfit">Login now to tack all your expenses</Text>
            </VStack>

          <VStack space="xs" className='mb-4'>
            <Text className="text-typography-700 font-OutfitBold">Email</Text>
            <Input className="min-w-[250px]" size="xl">
              <InputField type="text"  placeholder="Enter your  email"  onChangeText={(value) => setForm({ ...form, email: value })} value={form.email}/>
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-700 font-OutfitBold">Password</Text>
            <Input className="text-center" size="xl">
              <InputField type={showPassword ? "text" : "password"}  placeholder="Enter your password" onChangeText={(value) => setForm({ ...form, password: value })} value={form.password}/>
              <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)} >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>





          <TouchableOpacity className="bg-[#0286ff] w-full p-3 rounded-xl mt-14" onPress={ onSignInPress }>
              <Text className="text-center text-2xl font-OutfitBold text-white">Sign In</Text>
          </TouchableOpacity>

          <HStack className="justify-center items-center " >
            <Link
                href="/(auth)/sign-up"
                className="text-lg text-center text-typography-700  mt-5 font-OutfitBold"
            >
              Don't have an account?{" "}
              <Text className="text-[#0286ff] font-OutfitBold">Sign up</Text>
            </Link>
          </HStack>

        </VStack>
      </VStack>
    </SafeAreaView>
  )
}

