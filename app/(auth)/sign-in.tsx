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
} from "@/components/ui/toast"

import { ChevronLeft, AlertCircle, Eye, EyeOff } from "lucide-react-native"
import { useRouter } from "expo-router"
import { VStack } from "@/components/ui/vstack"
import { Button, ButtonText } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Input, InputField, InputIcon } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "@/components/ui/box";

export default function LoginForm() {
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
    const newErrors = { email: "", password: "" }

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

        <VStack className="mt-12" >
          <FormControl>
            
            <VStack space="md" className="">
              <Heading className="text-white" size="4xl">Hey 👋,</Heading>
              <Heading className="text-white" size="4xl">Welcome back</Heading>
            </VStack>

            <VStack className="mt-10">
              <Text size="xl" className="text-white mb-6">Login now to tack all your expenses</Text>
            </VStack>

            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel >
                <FormControlLabelText  className="text-2xl mb-4 mt-6">Email</FormControlLabelText>
              </FormControlLabel>
              <Input variant="rounded" size="xl"  className="">
                <InputField
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                <FormControlLabelText  className="text-2xl mb-4 mt-6">Password</FormControlLabelText>
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

          

          <TouchableOpacity className="bg-[#a3e635] w-full p-4 rounded-full mt-14" onPress={() => handleSubmit() }>
              <Text className="text-center text-2xl font-semibold">Login</Text>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}

