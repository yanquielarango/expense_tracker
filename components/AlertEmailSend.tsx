import {View, Text} from 'react-native'
import React, {useState} from 'react'
import { AlertDialog, AlertDialogBackdrop,
    AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog'
import { Heading } from './ui/heading'
import { X} from 'lucide-react-native'
import { Button } from './ui/button'
import {useRouter} from "expo-router";
import {Icon} from "@/components/ui/icon";

const AlertEmailSend = ({setOpenAlertDialog, openAlertDialog} : any) => {
    const [error, setError] = useState("")
    const router = useRouter()

    const handleClose = () => {
        setOpenAlertDialog(false)
        router.back()
    }
    return (
        <AlertDialog isOpen={openAlertDialog} onClose={handleClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent className="p-5">
                <AlertDialogHeader>
                    <Heading>Email Status</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={X}  className='w-7 h-7'/>
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    {error ? (
                        <Text className="text-red-500 mb-4 font-Outfit text-lg">{error} </Text>
                    ) :  <Text className="text-green-500 mb-4 font-Outfit text-lg"> Email sent successfully!</Text>
                    }

                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant='outline' onPress={handleClose}>
                       <Text>Close</Text>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default AlertEmailSend
