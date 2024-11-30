import { View, Text } from "react-native";
import { Meditation } from "@/types";

export default function MeditationListItem({
  meditation,
}: {
  meditation: Meditation;
}) {
  return (
    <View className="p-5  border-2 rounded-2xl border-gray-300">
      <Text className="font-semibold text-xl color-blue-800">
        {meditation.title}
      </Text>
    </View>
  );
}
