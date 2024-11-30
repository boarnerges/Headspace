import { FlatList, Text, View } from "react-native";
import { meditations } from "@/data";
import MeditationListItem from "@/component/MeditationListItem";

export default function HomeScreen() {
  return (
    <FlatList
      data={meditations}
      className="bg-white"
      contentContainerClassName="gap-8 p-3"
      renderItem={({ item }) => <MeditationListItem meditation={item} />}
    />
  );
}
