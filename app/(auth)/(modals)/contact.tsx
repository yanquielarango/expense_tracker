import {
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from '@/components/ui/vstack';
import { useUserProfile } from "@/hooks/useUserProfile";
import emailjs, { EmailJSResponseStatus } from '@emailjs/react-native';
import { Spinner } from "@/components/ui/spinner";
import AlertEmailSend from "@/components/AlertEmailSend";
import Ionicons from "@expo/vector-icons/Ionicons";
import {HStack} from "@/components/ui/hstack";
import {useRouter} from "expo-router";

const Contact = () => {
    const [openAlertDialog, setOpenAlertDialog] = useState(false)
    const router = useRouter()

    const { userProfile } = useUserProfile()
    const [form, setForm] = useState({
        name: userProfile?.firstName,
        email: userProfile?.email,
        subject: "",
        message: "",
    })
    const [isloading, setIsLoading] = useState<boolean>(false);



    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            const response = await emailjs.send(
                'service_f0nhpb4',
                'template_bimyhg5',
                {
                    from_name: form.name,
                    from_email: form.email,
                    to_email: "yanquielwebdesigner@gmail.com",
                    subject: form.subject,
                    message: form.message,
                },
                {
                    publicKey: 'user_fz6m4QIW6dT44H16hQAbJ',
                },
            )

            setForm({
                ...form,
                subject: "",
                message: "",
            })
            setOpenAlertDialog(true)
        } catch (err) {
            if (err instanceof EmailJSResponseStatus) {
                Alert.alert("Error", "Failed to send email. Please try again later.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"} keyboardVerticalOffset={100} className="flex-1">
        <SafeAreaView className="flex-1">
            {/* Header with back button */}
            <HStack className='border-[#e0e0e0] border-b-[1px] mb-4 px-4 py-3 gap-2 items-center'>
                <TouchableOpacity onPress={() => router.dismiss()}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text className="text-[#333] text-2xl font-OutfitBold">Contact Us</Text>

            </HStack>

            {/* Main content in a scrollable area */}
            <ScrollView className="flex-grow">
                <VStack className="px-6" >
                    <VStack>
                        <VStack className="">
                            <Text className="text-lg font-Outfit">Get in touch with our support staff to get answers to your burning questions!</Text>
                            <Text className="text-lg font-Outfit mt-4">By submitting a ticket, you agree to adhere to our Terms of Engagement.</Text>
                        </VStack>

                        <VStack space="xs" className="mt-8">
                            <Text className="text-lg font-Outfit">Name</Text>
                            <TextInput
                                className=" border border-primary-300  rounded-xl p-4  focus:border-[#673ab7] focus:border-2 "
                                style={{textAlignVertical: "top"}}
                                value={form.name}  onChangeText={(value) => setForm({ ...form, name: value })}
                            />
                        </VStack>

                        <VStack space="xs" className="mt-5">
                            <Text className="text-lg font-Outfit">Email</Text>
                            <TextInput
                                className=" border border-primary-300  rounded-xl p-4  focus:border-[#673ab7] focus:border-2 "
                                style={{textAlignVertical: "top"}}
                                value={form.email}  onChangeText={(value) => setForm({ ...form, email: value })}
                            />
                        </VStack>

                        <VStack space="xs" className="mt-5">
                            <Text className="text-lg font-Outfit">Subject</Text>
                            <TextInput
                                className=" border border-primary-300  rounded-xl p-4  focus:border-[#673ab7] focus:border-2 "
                                style={{textAlignVertical: "top"}}
                                value={form.subject} onChangeText={(value) => setForm({ ...form, subject: value })}
                            />
                        </VStack>

                        <VStack space="xs" className="mt-5">
                            <Text className="text-lg font-Outfit">How can we help?</Text>
                            <TextInput
                                multiline
                                className=" border border-primary-300 h-32 rounded-xl p-4  focus:border-[#673ab7] focus:border-2 "
                                style={{textAlignVertical: "top"}}
                                value={form.message}  onChangeText={(value) => setForm({ ...form, message: value })}
                            />
                        </VStack>
                    </VStack>
                </VStack>


            </ScrollView>


            <VStack className="absolute  bottom-0 right-0 left-0 bg-white border-t-[#e0e0e0] border-t-[1px] px-4 py-3 ">
                <TouchableOpacity className="bg-[#673ab7] p-4 rounded-xl" >
                    {isloading ? (
                        <Spinner size="large" className="text-white" />
                    ) : (
                        <Text className="text-center text-2xl font-OutfitBold text-white">Create a ticket</Text>
                    )}
                </TouchableOpacity>
            </VStack>

            <AlertEmailSend setOpenAlertDialog={setOpenAlertDialog} openAlertDialog={openAlertDialog}/>
        </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Contact
