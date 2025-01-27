import React, {useCallback, useState} from "react"
import { TouchableOpacity } from "react-native"

import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control"
import { Text } from '@/components/ui/text';
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast"

import { ChevronLeft, AlertCircle, Eye, EyeOff } from "lucide-react-native"
import { Link, useRouter } from "expo-router"
import { VStack } from "@/components/ui/vstack"
import { Button, ButtonText } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Input, InputField, InputIcon } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import {useSignIn } from "@clerk/clerk-expo";

export default function LoginForm() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })


  const [errors, setErrors] = useState<{ [key: string]: string }>({})


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
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      if (err.errors && err.errors.length > 0) {
        const newErrors: { [key: string]: string } = {}
        err.errors.forEach((error: any) => {
          if (error.meta && error.meta.paramName) {
            newErrors[error.meta.paramName] = error.longMessage || error.message
          }
        })
        setErrors(newErrors)
      }
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])





  return (
    <SafeAreaView className="flex-1 bg-[#171717]">
      <VStack  className="p-4" >
           <Button size='md'  className='w-14  rounded-2xl  py-7' onPress={() => router.back()}>
              <Icon className='text-white w-14 h-14' as={ChevronLeft }/>
           </Button>

        <VStack className="mt-8" >
          <FormControl>
            
            <VStack space="md" className="">
              <Heading className="text-white " size="4xl">Hey 👋,</Heading>
              <Heading className="text-white" size="4xl">Welcome back</Heading>
            </VStack>

            <VStack className="mt-10">
              <Text size="xl" className="text-white mb-6">Login now to tack all your expenses</Text>
            </VStack>

            <FormControl isInvalid={!!errors.email_address}>
              <FormControlLabel >
                <FormControlLabelText  className="text-2xl mb-4 mt-6">Email</FormControlLabelText>
              </FormControlLabel>
              <Input variant="rounded" size="xl"  className="" >
                <InputField
                  placeholder="Enter your email"
                  value={form.email}
                  onChangeText={(value) => setForm({...form, email: value})}
                  keyboardType="email-address"
                  autoCapitalize="none"
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

            <FormControl  isInvalid={!!errors.password}>
              <FormControlLabel >
                <FormControlLabelText  className="text-2xl mb-4 mt-6">Password</FormControlLabelText>
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

          

          <TouchableOpacity className="bg-[#a3e635] w-full p-3 rounded-full mt-14" onPress={ onSignInPress }>
              <Text className="text-center text-2xl font-semibold text-black">Login</Text>
          </TouchableOpacity>

          <HStack className="justify-center items-center mt-8" space="md">
            <Text className="text-white ">Don't have an account?</Text>
            <Link  href='/(auth)/sign-up' className="text-[#a3e635]">Sign up</Link>
          </HStack>

        </VStack>
      </VStack>
    </SafeAreaView>
  )
}

