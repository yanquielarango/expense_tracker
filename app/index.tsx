import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
    <VStack className="justify-between">
      <Text className="text-2xl font-bold"> Hello</Text>
      <Text className="text-2xl font-bold"> Yanquiel</Text>
    </VStack>

    </SafeAreaView>
  );
}
