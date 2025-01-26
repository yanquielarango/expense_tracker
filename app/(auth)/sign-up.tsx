import React, { useState } from "react"
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
} from "@/components/ui/toast";
import { Divider } from '@/components/ui/divider';

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
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";



export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
   
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const toast = useToast()
  const [toastId, setToastId] = React.useState(0)



  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "", password: "" }

   

    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Add your submission logic here
      showNewToast({ email: formData.email, password: formData.password })
      
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateForm()
  }


  const showNewToast = ({ email, password }: { email: string; password: string }) => {
    const newId = Math.random()
    setToastId(newId)
    toast.show({
      id: newId.toString(),
      placement: "top right",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id
        return (
          <Toast nativeID={uniqueToastId} action="success" variant="solid" className=" mt-16">
            <ToastTitle>{email}</ToastTitle>
            <ToastDescription>
              {password}
            </ToastDescription>
          </Toast>
        )
      },
    })
  }





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

            

            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel >
                <FormControlLabelText  className="text-xl mb-3 mt-6">Email</FormControlLabelText>
              </FormControlLabel>
              <Input variant="rounded" size="xl"  className="">
                <InputField
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  
                />
              </Input>
              {errors.email && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircle} />
                  <FormControlErrorText>{errors.email}</FormControlErrorText>
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
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
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

          

          <TouchableOpacity className="bg-[#a3e635] w-full p-3 rounded-full mt-8" onPress={() => handleSubmit() }>
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
      </VStack>
    </SafeAreaView>
  )
}

