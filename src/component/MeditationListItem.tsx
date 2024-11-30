import { View, Text, Pressable } from "react-native";
import { Meditation } from "@/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

export default function MeditationListItem({
  meditation,
}: {
  meditation: Meditation;
}) {
  return (
    <Link href={`/meditation/${meditation.id}`} asChild>
      <Pressable className="flex-row items-center gap-5">
        <View className="bg-green-700 rounded-full p-2">
          <FontAwesome name="check" size={16} color="white" />
        </View>

        <View className="flex-1 p-5 py-8 border-2 rounded-2xl border-gray-300">
          <Text className="font-semibold text-2xl  color-blue-800 mb-2">
            {meditation.title}
          </Text>

          <View className=" flex-row items gap-1">
            <FontAwesome6 name="clock" size={16} color="#6B7288" />
            <Text className="text-green-600">{meditation.duration}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
