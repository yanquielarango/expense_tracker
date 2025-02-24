import { Text, TouchableOpacity, Alert} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import { VStack } from '@/components/ui/vstack';
import {router} from "expo-router";
import {Input, InputField} from "@/components/ui/input";
import {Textarea, TextareaInput} from '@/components/ui/textarea';
import {useUserProfile} from "@/hooks/useUserProfile";
import {HStack} from "@/components/ui/hstack";
import {Icon} from "@/components/ui/icon";
import {ChevronLeft} from "lucide-react-native";
import emailjs, { EmailJSResponseStatus } from '@emailjs/react-native';
import {Spinner} from "@/components/ui/spinner";
import AlertEmailSend from "@/components/AlertEmailSend";




const ContactSupport = () => {
    const [openAlertDialog, setOpenAlertDialog] = useState(false)

    const {userProfile} = useUserProfile()
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

            console.log("SUCCESS!", response.status, response.text)
            setForm({
                ...form,
                subject: "",
                message: "",
            })
            setOpenAlertDialog(true)
        } catch (err) {
            if (err instanceof EmailJSResponseStatus) {
                console.log('EmailJS Request Failed...', err);
                Alert.alert("Error", "Failed to send email. Please try again later.")
            }


        } finally {
            setIsLoading(false)
        }
    }


    return (
        <SafeAreaView>
            <VStack className="px-6" >

                <VStack>
                    <VStack className="">
                        <Text className="text-lg font-Outfit">Get in touch with our support staff to get answers to your burning questions!</Text>
                        <Text className="text-lg font-Outfit mt-4">By submitting a ticket, you agree to adhere to our Terms of Engagement.</Text>
                    </VStack>

                    <VStack space="xs" className="mt-8">
                        <Text className="text-lg font-Outfit">Name</Text>
                        <Input className="" size="xl">
                            <InputField type="text" value={form.name}  onChangeText={(value) => setForm({ ...form, name: value })}/>
                        </Input>
                    </VStack>

                    <VStack space="xs" className="mt-5">
                        <Text className="text-lg font-Outfit">Email</Text>
                        <Input className="" size="xl" >
                            <InputField type="text"  value={form.email} onChangeText={(value) => setForm({ ...form, email: value })}/>
                        </Input>
                    </VStack>

                    <VStack space="xs" className="mt-5">
                        <Text className="text-lg font-Outfit">Subject</Text>
                        <Input className="" size="xl" >
                            <InputField type="text"  value={form.subject} onChangeText={(value) => setForm({ ...form, subject: value })}/>
                        </Input>
                    </VStack>

                    <VStack space="xs" className="mt-5">
                        <Text className="text-lg font-Outfit">How can we help?</Text>
                        <Textarea
                            size="md"
                            isReadOnly={false}
                            isInvalid={false}
                            isDisabled={false}
                        >
                            <TextareaInput value={form.message}  onChangeText={(value) => setForm({ ...form, message: value })} />
                        </Textarea>
                    </VStack>

                    <TouchableOpacity className="bg-[#0286ff] w-full p-3 rounded-xl mt-8"  onPress={handleSubmit} >
                        {
                            isloading ? (
                                <Spinner size="large"  className="text-white" />
                            ) :  <Text className="text-center text-2xl font-OutfitBold text-white">Create a ticket</Text>
                        }
                    </TouchableOpacity>
                </VStack>
            </VStack>
            <AlertEmailSend setOpenAlertDialog={setOpenAlertDialog} openAlertDialog={openAlertDialog}/>
        </SafeAreaView>
    )
}

export default ContactSupport
