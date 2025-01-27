import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href="/(auth)/welcome"/>;
    } else {
        return <Redirect href="/(tabs)/home"/>;
    }
};

export default Page;