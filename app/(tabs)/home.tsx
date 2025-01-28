import { useClerk } from '@clerk/clerk-react'
import {TouchableOpacity, View, Text} from "react-native";
import {useAuth} from "@clerk/clerk-expo";


const Home = () => {
    const {signOut} = useAuth()

    const logout = () => {
        signOut()
    }

  return (
    <View  className="items-center justify-center flex-1">
        <TouchableOpacity className="w-[100px] "  onPress={logout}>
            <Text>Logout</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Home;