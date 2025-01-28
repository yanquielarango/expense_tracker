import {Slot, Stack, useRouter, useSegments} from "expo-router";
import { useEffect } from "react";
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";


import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { colors } from "@/constants/theme";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  const InitialLayout = () => {
    const [loaded, error] = useFonts({
      "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
      "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
      "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
      "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
      "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
      "Jakarta": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
      "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });

    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);



    useEffect(() => {
      if (!isLoaded) return

      const inTabsGroup = segments[0] === "(tabs)"
      const inAuthGroup = segments[0] === "(auth)"

      if (isSignedIn && !inTabsGroup) {
        // Si está autenticado pero no en tabs, redirigir a home
        router.replace("/(tabs)/home")
      } else if (!isSignedIn && !inAuthGroup) {
        // Si no está autenticado y no en auth, redirigir a welcome
        router.replace("/(auth)/welcome")
      }
    }, [isSignedIn]) // Added router.replace to dependencies



    return (
        <Stack screenOptions={{contentStyle: { backgroundColor: '#171717'}}}>
          <Stack.Screen name='(auth)' options={{headerShown: false}}/>
          <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        </Stack>
    )

  }


const  RootLayout = () => {
  return (
    <GluestackUIProvider mode="light">
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
              <InitialLayout />
          </ConvexProviderWithClerk>

        </ClerkLoaded>

      </ClerkProvider>

      <StatusBar style="dark" />
    </GluestackUIProvider>
  )
}


export default RootLayout;