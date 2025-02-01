import { Stack } from "expo-router"

export default function ModalLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                // contentStyle: { backgroundColor: "#171717" },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen
                name="profileModal"
                options={{
                    headerShown: false,
                    presentation: "modal",
                    animation: "slide_from_bottom",
                }}
            />


        </Stack>
    )
}

