import { Stack } from "expo-router";
import { useEffect } from "react";
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";


import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { colors } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

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
      <Stack screenOptions={{contentStyle: { backgroundColor: '#171717'}}}>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='(auth)' options={{headerShown: false}}/>
      </Stack>

      <StatusBar style="light"  backgroundColor={colors.neutral900}/>
    </GluestackUIProvider>
  )
}
