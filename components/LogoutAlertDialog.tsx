import React from "react";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader
} from "./ui/alert-dialog";
import { Heading } from "./ui/heading";
import { Icon } from "./ui/icon";
import {Button, ButtonText} from "@/components/ui/button";
import {Text} from "react-native"
import {X} from "lucide-react-native";
import {useAuth} from "@clerk/clerk-expo";

const LogoutAlertDialog = ({openLogoutAlertDialog, setOpenLogoutAlertDialog, }: any) => {

    const {signOut} = useAuth()

    const logout = () => {
        signOut()
        console.log("logout", )
    }
    const handleClose = () => {
        setOpenLogoutAlertDialog(false);
    };

    return (
        <AlertDialog isOpen={openLogoutAlertDialog} onClose={handleClose} >
            <AlertDialogBackdrop />
            <AlertDialogContent className="p-5  " >
                <AlertDialogHeader>
                    <Heading>Logout</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={X} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody className="" contentContainerClassName="">
                    <Text className="mb-6">Are you sure, you want to logout?</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant="outline" action="secondary" onPress={handleClose}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button action="negative" onPress={logout}>
                        <ButtonText className="text-white">Logout</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutAlertDialog;