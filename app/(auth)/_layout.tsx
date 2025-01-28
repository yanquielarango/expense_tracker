import { Stack } from "expo-router"

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#171717" },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen
                name="welcome"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="sign-in"
                options={{
                    presentation: "modal",
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    presentation: "modal",
                    animation: "slide_from_right",
                }}
            />
        </Stack>
    )
}

