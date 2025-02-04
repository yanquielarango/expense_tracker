import { Stack, useRouter, useSegments} from "expo-router";
import { useEffect } from "react";
import {  useFonts } from '@expo-google-fonts/inter';
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

if (!convex) {
  throw new Error("Missing Convex URL")
}

  const InitialLayout = () => {
    const [loaded, error] = useFonts({
     "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
      "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
     "Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
     "Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
     "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
     "Outfit-Semibold": require("../assets/fonts/Outfit-SemiBold.ttf"),
      "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
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
        <Stack>
          <Stack.Screen name='(auth)' options={{headerShown: false}}/>
          <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
          <Stack.Screen name='(modals)' options={{headerShown: false}} />
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