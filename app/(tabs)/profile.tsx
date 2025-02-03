import { View, Text } from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {VStack} from "@/components/ui/vstack";
import {Divider} from "@/components/ui/divider";
import ProfileCard from "@/components/ProfileCard";
import {HStack} from "@/components/ui/hstack";
import {Icon} from "@/components/ui/icon";
import {Bell, ChevronRight, Lock, HeadsetIcon, User, Trash2, LogOut  } from "lucide-react-native";
import {Pressable} from "@/components/ui/pressable";
import LogoutAlertDialog from "@/components/LogoutAlertDialog";
import {router} from "expo-router";
import DeleteAcountDialig from "@/components/DeleteAcountDialig";


const profile = () => {
    const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false)
    const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false)



    return (
      <SafeAreaView className="flex-1 bg-white">
        <VStack className="px-5 mt-4 " >
            <Text className='font-JakartaBold text-3xl'>Profile</Text>
            <ProfileCard/>
            <Divider className="mt-12 mb-8" />
            <VStack space="4xl">
                <Pressable onPress={() => router.push('/(modals)/profileModal')}>
                    <HStack className="justify-between">
                            <HStack space="md">
                                <Icon as={User}  className='w-7 h-7'/>
                                <Text className='text-xl'>Profile</Text>
                            </HStack>
                            <Icon as={ChevronRight}  className='w-7 h-7' />
                    </HStack>
                </Pressable>


                <Pressable onPress={() => router.push('/(modals)/profileModal')}>
                    <HStack className="justify-between items-center">
                        <HStack space="md">
                            <Icon as={Bell}  className='w-7 h-7'/>
                            <Text className='text-xl'>Notifications</Text>
                        </HStack>
                        <Icon as={ChevronRight}  className='w-7 h-7' />
                    </HStack>
                </Pressable>


               <Pressable onPress={() =>router.push('/(modals)/profileModal')}>
                   <HStack className="justify-between">
                       <HStack space="md">
                           <Icon as={Lock}   className='w-7 h-7'/>
                           <Text className='text-xl'>Privacy Policy</Text>
                       </HStack>
                       <Icon as={ChevronRight}   className='w-7 h-7'/>
                   </HStack>
               </Pressable>



                <Pressable onPress={() =>router.push('/(modals)/profileModal')}>
                    <HStack className="justify-between  ">
                        <HStack space="md" className="">
                            <Icon as={HeadsetIcon}   className='w-7 h-7'/>
                            <Text className='text-xl'>Contact Support</Text>
                        </HStack>
                        <Icon as={ChevronRight}  className='w-7 h-7' />
                    </HStack>
                </Pressable>

            </VStack>
            <Divider className="mt-12 mb-8" />

           <VStack space="4xl">
               <Pressable className="flex-row  items-center gap-2 " onPress={() => setOpenLogoutAlertDialog(true)}>
                   <Icon as={LogOut  }  className='w-7 h-7 color-red-500' />
                   <Text className='text-xl color-red-500'>Logut </Text>
               </Pressable>

               <Pressable className="flex-row  items-center gap-2 " onPress={() => setOpenDeleteAlertDialog(true)}>
                   <Icon as={Trash2 }  className='w-7 h-7 color-red-500' />
                   <Text className='text-xl color-red-500'>Delete Account</Text>
               </Pressable>
           </VStack>



        </VStack>
          <LogoutAlertDialog setOpenLogoutAlertDialog={setOpenLogoutAlertDialog} openLogoutAlertDialog={openLogoutAlertDialog}  />
          <DeleteAcountDialig setOpenDeleteAlertDialog={setOpenDeleteAlertDialog} openDeleteAlertDialog={openDeleteAlertDialog}  />
      </SafeAreaView>
  )
}

export default profile