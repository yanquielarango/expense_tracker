import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";


const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(modals)" options={{ headerShown: false, presentation: 'modal', animation: "slide_from_bottom" }} />

        </Stack>
    )
}
export default Layout
