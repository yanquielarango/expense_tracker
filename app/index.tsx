import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {

    return <Redirect href={'/(auth)/welcome'} />


 
}