import { Stack } from "expo-router"

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#171717" },

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

            />
            <Stack.Screen
                name="sign-up"

            />
        </Stack>
    )
}

