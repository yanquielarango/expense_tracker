import React, { useState } from "react";
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
import {useAuth, useUser} from "@clerk/clerk-expo";
import {useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import {Spinner} from "@/components/ui/spinner";


const LogoutAlertDialog = ({openDeleteAlertDialog, setOpenDeleteAlertDialog, }: any) => {
    const deleteUser = useMutation(api.users.deleteUser)

    const { user } = useUser()
    const { signOut } = useAuth()
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const userId = user?.id



    const handleClose = () => {
        setOpenDeleteAlertDialog(false)
        setError(null)
    }

    const handleDeleteUser = async () => {
        if (!userId) {
            setError("User ID not found");
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            await deleteUser({ clerkId: userId });
            await signOut();
            handleClose();
        } catch (error) {
            setError("Failed to delete user. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };




    return (
        <AlertDialog isOpen={openDeleteAlertDialog} onClose={handleClose} >
            <AlertDialogBackdrop />
            <AlertDialogContent className="p-5  " >
                <AlertDialogHeader>
                    <Heading>Delete Account</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={X} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody className="" contentContainerClassName="">
                    <Text className="mb-3">Are you sure, you want to delete the account ?</Text>
                    {error && <Text className="text-red-500 mb-4 font-Outfit">{error}</Text>}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant="outline" action="secondary" onPress={handleClose}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button action="negative" onPress={ handleDeleteUser} disabled={isDeleting}>
                        <ButtonText className="text-white">
                            {isDeleting ? <Spinner size="small"  className="text-white" /> : "Delete User"}
                        </ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutAlertDialog;