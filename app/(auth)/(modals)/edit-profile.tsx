
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {VStack} from "@/components/ui/vstack";
import { Icon } from '@/components/ui/icon';
import { Pencil} from "lucide-react-native";
import {TouchableOpacity, Text, View, ActivityIndicator,StyleSheet} from "react-native";
import {Avatar, AvatarBadge, AvatarFallbackText, AvatarImage} from '@/components/ui/avatar';
import {useRouter} from "expo-router";
import {Input, InputField} from "@/components/ui/input";
import {useUserProfile} from "@/hooks/useUserProfile";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import * as ImagePicker from "expo-image-picker";
import { HStack } from '@/components/ui/hstack';
import Ionicons from "@expo/vector-icons/Ionicons";
import {Spinner} from "@/components/ui/spinner";
import {Id} from "@/convex/_generated/dataModel";

const EditProfile = () => {
    const {userProfile} = useUserProfile()
    const updateUserProfile = useMutation(api.users.updateUserProfile)
    const generateUploadUrl = useMutation(api.users.generateUploadUrl);
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const [form, setForm] = useState({
        name: userProfile?.firstName,
        imageStorageId: "",
    })



    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0])
        } else {
            alert('You did not select any image.');
        }
    };


    useEffect(() => {
        if (userProfile) {
            setForm({
                name: userProfile.firstName || '',
                imageStorageId: userProfile.imageUrl || "",
            })
        }
    }, [userProfile])





    const handleUpdateUserProfile = async () => {
        setIsLoading(true);
        try {
            let imageUrl = userProfile?.imageUrl; // This should already be a storage ID

            if (selectedImage) {
                const postUrl = await generateUploadUrl();

                // Convert URI to blob
                const response = await fetch(selectedImage.uri);
                const blob = await response.blob();

                // POST the file to the URL
                const result = await fetch(postUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': selectedImage.mimeType || 'image/jpeg' },
                    body: blob,
                });
                const { storageId: newStorageId } = await result.json();
                imageUrl = newStorageId; // This is the correct storage ID
            }

            // Update the profile using the storage ID directly
            await updateUserProfile({
                name: form.name  || "",
                imageUrl: imageUrl || ""
            });

            router.back();
        } catch (error) {
            console.error('Error updating profile:', error);
            // Add user-friendly error handling here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView >
            <HStack className='border-[#e0e0e0] border-b-[1px] mb-4 px-4 py-3 gap-2 items-center'>
                <TouchableOpacity onPress={() => router.dismiss()} >
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text className="text-[#333] text-2xl font-OutfitBold">Edit Profile</Text>
            </HStack>
            <VStack className="p-6  ">

                <VStack>
                    <VStack className=" justify-center items-center ">
                        {selectedImage ? (
                            <TouchableOpacity onPress={selectImage} activeOpacity={1}>
                                <Avatar className="bg-primary-500" size="3xl">
                                    <AvatarFallbackText className="text-2xl" >{userProfile?.firstName}</AvatarFallbackText>
                                    <AvatarImage
                                        source={{ uri: selectedImage.uri }}
                                    />
                                    <View   className="absolute right-0 bottom-1">
                                        <AvatarBadge className="justify-center items-center bg-[#673ab7]" >
                                            <Icon as={Pencil } className="h-7 w-7 text-white "/>
                                        </AvatarBadge>
                                    </View>
                                </Avatar>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={selectImage} activeOpacity={1}>
                            <Avatar className="bg-primary-500" size="3xl" >
                                <AvatarFallbackText className="text-5xl" >{userProfile?.firstName}</AvatarFallbackText>
                                <AvatarImage
                                    source={{uri: userProfile?.imageUrl || undefined }}
                                />
                                <View className="absolute right-0 bottom-1 " >
                                    <AvatarBadge className="justify-center items-center bg-[#673ab7]">
                                        <Icon as={Pencil } className="h-7 w-7 text-white "/>
                                    </AvatarBadge>
                                </View>
                            </Avatar>
                            </TouchableOpacity>
                        )}


                    </VStack>
                </VStack>

                <VStack >
                    <VStack className="mt-10 ">
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



            </VStack>


            <VStack className=" bg-white px-4 py-3 border-t-[1px] border-[#e0e0e0]   mt-[305px]">
                <TouchableOpacity className="bg-[#673ab7] p-4 rounded-xl" activeOpacity={0.8} onPress={handleUpdateUserProfile} >
                    {isLoading ? (
                        <Spinner size="large" className="text-white" />
                    ) : (
                        <Text className="text-center text-2xl font-OutfitBold text-white">Update Profile</Text>
                    )}
                </TouchableOpacity>
            </VStack>




        </SafeAreaView>
    )
}
export default EditProfile


