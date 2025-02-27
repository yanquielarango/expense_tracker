import { Stack } from "expo-router"
import { TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
    const router = useRouter()



    return (
        <Stack
            screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false, headerShown: true }}
        >
            <Stack.Screen
                name="edit-profile"
                options={{
                    headerShown: false,
                    presentation: "modal"
                }}
            />
            <Stack.Screen
                name="contact"
                options={{
                    headerShown: false,
                    presentation: "modal",
                }}
            />
        </Stack>
    )
}