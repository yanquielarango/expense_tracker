import { Stack } from "expo-router"
import { TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ModalLayout() {
    const router = useRouter()

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen
                name="profileModal"
                options={{
                    headerShown: true,
                    presentation: "modal",
                    headerTitle: "Update Profile",
                    headerTitleAlign: "center",
                    headerShadowVisible: false
                    ,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={32} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="contactSupport"
                options={{
                    headerShown: true,
                    presentation: "modal",
                    headerTitle: "Contact Support",
                    headerTitleAlign: "center",
                    headerShadowVisible: false
,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={32} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    )
}