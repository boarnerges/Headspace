import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { meditations } from "@/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { top } = useSafeAreaInsets();
  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Meditation not found!</Text>;
  }

  return (
    <SafeAreaView>
      <Text className="text-3xl">{meditation?.title}</Text>
      <AntDesign
        onPress={() => router.back()}
        className="absolute right-4"
        name="close"
        size={24}
        color="black"
        style={{ top: top + 16 }}
      />
    </SafeAreaView>
  );
}
