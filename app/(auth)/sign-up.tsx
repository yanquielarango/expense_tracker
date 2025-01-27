import React, { useState } from "react"
import {Alert, TouchableOpacity} from "react-native"

import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';

import { ChevronLeft, AlertCircle, Eye, EyeOff, Lock } from "lucide-react-native"
import { Link, useRouter } from "expo-router"
import { VStack } from "@/components/ui/vstack"
import { Button, ButtonText } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import {useSignUp} from "@clerk/clerk-expo";
import {ReactNativeModal} from "react-native-modal";
import {CustomInput} from "@/components/ui/customInput";



export default function Signup() {
  const {isLoaded, signUp, setActive} = useSignUp()
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})


  const [showPassword, setShowPassword] = useState(false)








  const onSignUpPress = async () => {
    if (!isLoaded ) return;
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
     if (err.errors && err.errors.length > 0) {
       const newErrors: { [key: string]: string } = {}
       err.errors.forEach((error: any) => {
         if (error.meta && error.meta.paramName) {
           newErrors[error.meta.paramName] = error.longMessage || error.message
         }
       })
       setErrors(newErrors)
     }
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
    <SafeAreaView className="flex-1 bg-[#171717]">
      <VStack  className="p-4" >
           <Button size='md'  className='w-14  rounded-2xl  py-7' onPress={() => router.back()}>
              <Icon className='text-white w-14 h-14' as={ChevronLeft }/>
           </Button>

        <VStack className="mt-8" >
          <FormControl>
            
            <VStack space="md" className="">
              <Heading className="text-white " size="4xl">Let's,</Heading>
              <Heading className="text-white" size="4xl">Get Started</Heading>
            </VStack>

            <VStack className="mt-6">
              <Text size="xl" className="text-white mb-3">Create an account to track your expenses</Text>
            </VStack>

            

            <FormControl isInvalid={!!errors.email_address}>
              <FormControlLabel >
                <FormControlLabelText  className="text-xl mb-3 mt-6">Email</FormControlLabelText>
              </FormControlLabel>
              <Input variant="rounded" size="xl"  className="">
                <InputField
                  placeholder="Enter your email"
                  value={form.email}
                  onChangeText={(value) => setForm({...form, email: value})}
                  
                />
              </Input>
              {errors.email_address && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircle} />
                  <FormControlErrorText>
                    {errors.email_address}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel >
                <FormControlLabelText  className="text-xl mb-3 mt-6">Password</FormControlLabelText>
              </FormControlLabel>
              <Input variant="rounded" size="xl" className="">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChangeText={(value) => setForm({...form, password: value})}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='pr-4'>
                  <InputIcon as={showPassword ? Eye : EyeOff} />
                </TouchableOpacity>
              </Input>
              {errors.password && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircle} />
                  <FormControlErrorText>{errors.password}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </FormControl>

          

          <TouchableOpacity className="bg-[#a3e635] w-full p-3 rounded-full mt-8" onPress={() => onSignUpPress() }>
              <Text className="text-center text-2xl text-black font-bold">Sign Up</Text>
          </TouchableOpacity>

          <HStack className="mt-6 justify-center items-center gap-4">
              <Divider orientation="horizontal" className="flex-1"/>
              <Text className="text-white">Or</Text>
              <Divider orientation="horizontal" className="flex-1 "/>
          </HStack>

          <VStack>
              <TouchableOpacity   className="border border-neutral-50 p-3 rounded-full mt-4 flex-row justify-center items-center gap-3" onPress={() => router.back()}>
                <Image source={require('@/assets/images/google.png')}  className="h-8 w-8"/>
                <Text className="text-center text-white text-xl font-bold">Sign with Google</Text>
              </TouchableOpacity>
          </VStack>

          <HStack className="justify-center items-center mt-4" space="sm" >
            <Text className="text-white ">Already have an account?</Text>
            <Link  href='/(auth)/sign-in' className="text-[#a3e635]">Sign in</Link>
          </HStack>

        </VStack>

        <ReactNativeModal isVisible={verification.state === "pending"} onModalHide={() => setVerification({...verification, state: "success"})}>
            <Box className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-bold mb-2 text-black/70">Verification</Text>
              <Text className=" text-black font-bold mb-5">We've sent a verification code to {form.email}</Text>



              <CustomInput variant="rounded" size="xl" className="border-none  bg-gray-100 data-[focus=true]:border-black">
                <InputSlot>
                  <InputIcon as={Lock} className="text-gray-300 ml-4 "/>
                </InputSlot>
                <InputField
                    placeholder="123456"
                    value={verification.code}
                    onChangeText={(code) => setVerification({...verification,code})} keyboardType="numeric"
                    className=" text-black  "
                />
              </CustomInput>



              <TouchableOpacity className="bg-[#16a34a] w-full p-3 rounded-full mt-8" onPress={onPressVerify }>
                <Text className="text-center text-xl text-white font-bold">Verify Email</Text>
              </TouchableOpacity>
            </Box>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
            <Box className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Image source={require('@/assets/images/check.png')}  className="w-[100px] h-[100px] mx-auto my-5"/>

                <Text className="text-3xl text-center font-bold "> Verified</Text>
                <Text className="text-center text-gray-400 font-bold mt-2">Your account has been verified successfully</Text>

                <TouchableOpacity className="bg-[#171717] w-full p-3 rounded-full mt-8" onPress={() => router.replace('/(tabs)/home') }>
                  <Text className="text-center text-2xl text-white font-bold">Browse Home</Text>
                </TouchableOpacity>

            </Box>
        </ReactNativeModal>

      </VStack>
    </SafeAreaView>
  )
}

