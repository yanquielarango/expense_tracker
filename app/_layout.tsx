import { Stack } from "expo-router";
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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }



  return (
    <GluestackUIProvider mode="light">
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Stack screenOptions={{contentStyle: { backgroundColor: '#171717'}}}>
              <Stack.Screen name='(auth)' options={{headerShown: false}}/>
              <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
            </Stack>
          </ConvexProviderWithClerk>

        </ClerkLoaded>

      </ClerkProvider>

      <StatusBar style="light"  backgroundColor={colors.neutral900}/>
    </GluestackUIProvider>
  )
}
