
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {VStack} from "@/components/ui/vstack";
import { Icon } from '@/components/ui/icon';
import {ChevronLeft, Pencil} from "lucide-react-native";
import {TouchableOpacity, Text} from "react-native";
import {Avatar, AvatarBadge, AvatarImage} from '@/components/ui/avatar';
import {Pressable} from "@/components/ui/pressable";
import {router} from "expo-router";
import {HStack} from "@/components/ui/hstack";
import {Input, InputField} from "@/components/ui/input";
import {useUserProfile} from "@/hooks/useUserProfile";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";

const ProfileModal = () => {
    const {userProfile} = useUserProfile()
    const updateUserProfile = useMutation(api.users.updateUserProfile)
    const [form, setForm] = useState({
        name: userProfile?.firstName,
        imageUrl: "",
    })

    useEffect(() => {
        if (userProfile) {
            setForm({
                name: userProfile.firstName || '',
                imageUrl: userProfile.imageUrl || "",
            })
        }
    }, [userProfile])

    const handleUpdateUserProfile = async () => {
        try {
            await updateUserProfile({
                name: form.name || "",
                imageUrl: form.imageUrl || "",
            })
            console.log("Profile updated successfully")
            router.back() // Navigate back after successful update
        } catch (error) {
            console.error("Error updating profile:", error)
            // You might want to show an error message to the user here
        }
    }

    return (
        <SafeAreaView >
            <VStack className="p-6">
                <HStack className=" items-center gap-14 ">
                    <TouchableOpacity className="bg-background-dark rounded-2xl w-12 h-12 items-center justify-center p-2" onPress={() => router.back()}>
                        <Icon  as={ChevronLeft } className="h-12 w-12 text-white"/>
                    </TouchableOpacity>
                    <Text className=" text-3xl font-OutfitBold "> Update Profile</Text>
                </HStack>

                <VStack className="p-6">
                    <VStack className=" justify-center items-center ">
                        <Avatar size="3xl" >
                            <AvatarImage
                                source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                }}
                            />
                            <Pressable className="absolute right-0 bottom-1">
                                <AvatarBadge className="justify-center items-center">
                                    <Icon as={Pencil } className="h-7 w-7 text-white "/>
                                </AvatarBadge>
                            </Pressable>

                        </Avatar>
                    </VStack>
                </VStack>
                <VStack className=" ">
                    <VStack className="">
                        <Text className="font-Outfit text-xl mb-2">Name</Text>
                        <Input
                            variant="outline"
                            size="xl"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                        >
                            <InputField   value={form.name}  onChangeText={(value) => setForm({ ...form, name: value })}/>
                        </Input>
                    </VStack>
                </VStack>

                <VStack className="mt-20 ">
                    <TouchableOpacity className="bg-[#0286ff] w-full p-3 rounded-xl mt-14"  onPress={handleUpdateUserProfile}>
                        <Text className="text-center text-2xl font-OutfitBold text-white">Update</Text>
                    </TouchableOpacity>
                </VStack>
            </VStack>



        </SafeAreaView>
    )
}
export default ProfileModal
