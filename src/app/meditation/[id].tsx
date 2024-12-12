import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View, Pressable } from "react-native";
import { meditations } from "@/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../../sounds/audio1.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Meditation not found!</Text>;
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      <View className="flex-1">
        <View className="flex-1">
          <View className="flex-row items-center justify-between p-10">
            <AntDesign name="infocirlceo" size={24} color="black" />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Today's Meditation
              </Text>
            </View>

            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={26}
              color="black"
            />
          </View>

          <Text className="text-3xl mt-10 text-center text-zinc-800 font-semibold">
            {meditation?.title}
          </Text>
        </View>

        <Pressable
          className="bg-zinc-700 self-center w-20 aspect-square justify-center items-center p-6 rounded-full"
          onPress={playSound}
        >
          <FontAwesome6 name="play" size={24} color="snow" />
        </Pressable>
        <View className="flex-1">
          <View className="p-5 mt-auto gap-5">
            <View className="flex-row justify-between">
              <MaterialIcons name="airplay" size={24} color="black" />
              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="#3A3937"
              />
            </View>
            <View>
              <Slider
                style={{ width: "100%", height: 3 }}
                minimumValue={0}
                value={0.5}
                onSlidingComplete={(value) => console.log(value)}
                maximumValue={1}
                minimumTrackTintColor="#3A3937"
                maximumTrackTintColor="#3A393755"
                thumbTintColor="#3A3937"
              />
            </View>
            <View className="flex-row justify-between">
              <Text>03:24</Text>
              <Text>13:14</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
