import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View, Pressable } from "react-native";
import { meditations } from "@/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { useEffect, useState, useRef } from "react";
import { Audio } from "expo-av";

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // Total duration in milliseconds
  const [position, setPosition] = useState(0); // Current position in milliseconds

  const sliderRef = useRef(null); // Optional for future slider handling

  const meditation = meditations.find((m) => m.id === Number(id));
  if (!meditation) {
    return <Text>Meditation not found!</Text>;
  }

  // Load and prepare audio
  async function loadSound() {
    console.log("Loading sound...");
    const { sound } = await Audio.Sound.createAsync(
      require("../../../sounds/audio1.mp3"),
      { shouldPlay: false }
    );
    sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    setSound(sound);
  }

  // Update playback status
  const updatePlaybackStatus = (status: Audio.AudioStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  // Seek audio position
  const seekAudio = async (value: number) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
    }
  };

  // Unload audio when component unmounts
  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        console.log("Unloading sound...");
        sound.unloadAsync();
      }
    };
  }, []);

  // Format time from milliseconds to mm:ss
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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

        {/* Play/Pause Button */}
        <Pressable
          className="bg-zinc-700 self-center w-20 aspect-square justify-center items-center p-6 rounded-full"
          onPress={togglePlayPause}
        >
          <FontAwesome6
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="snow"
          />
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

            {/* Slider for playback */}
            <View>
              <Slider
                ref={sliderRef}
                style={{ width: "100%", height: 3 }}
                minimumValue={0}
                value={position / duration || 0}
                onSlidingComplete={(value) => seekAudio(value)}
                maximumValue={1}
                minimumTrackTintColor="#3A3937"
                maximumTrackTintColor="#3A393755"
                thumbTintColor="#3A3937"
              />
            </View>

            {/* Current Position and Duration */}
            <View className="flex-row justify-between">
              <Text>{formatTime(position)}</Text>
              <Text>{formatTime(duration)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
