import { Text} from 'react-native'
import React from 'react'
import {HStack} from "@/components/ui/hstack";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import {VStack} from "@/components/ui/vstack";

import {useUser} from "@clerk/clerk-expo";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import { useUserProfile } from '@/hooks/useUserProfile';



 export const ProfileCard = () => {
    const {userProfile} = useUserProfile()

console.log(userProfile)
  

    return (
        <HStack className="justify-between items-center mt-5 ">
            <HStack space="md">
                <Avatar className="bg-primary-500" size="lg">
                    <AvatarFallbackText >{userProfile?.firstName}</AvatarFallbackText>
                    <AvatarImage
                        source={{ uri: userProfile?.imageUrl }}
                    />
                </Avatar>
                <VStack>
                    <Text className="font-OutfitBold text-xl ">{userProfile?.firstName}</Text>
                    <Text className='mt-1 font-Outfit'>{userProfile?.email}</Text>
                </VStack>
            </HStack>
            
        </HStack>
    )
}
export default ProfileCard
