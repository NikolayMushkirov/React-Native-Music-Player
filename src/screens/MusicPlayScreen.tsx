import React, { useRef, useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";

import { ShuffleButton } from "../components/Buttons";
import ProgressBar from "../components/ProgressBar";
import { EqualizerButtonsBox, PlayButtonsBox } from "../components/Wrappers";

import { musicData } from "../utils/data";
import { Sound } from "expo-av/build/Audio";
import MusicTrackSlider from "../components/MusicTrackSlider";

const { width } = Dimensions.get("window");

const MusicPlayScreen = () => {
  const [sound, setSound] = useState<Sound | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [musicTrackSource, setMusicTrackSource] = useState<{
    uri: string;
  } | null>(null);

  const [scrollIndex, setScrollIndex] = useState(selectedTrack);

  const [shuffle, setShuffle] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const audioRef = useRef(null);

  const startMusicPlay = (index: number) => {
    if (index !== null) {
      setMusicTrackSource({ uri: musicData[selectedTrack].url });
    } else {
      setMusicTrackSource(null);
    }
    setSelectedTrack(index);
  };

  const prev = () => {
    const index =
      selectedTrack === 0 ? musicData.length - 1 : selectedTrack - 1;
    startMusicPlay(index);
  };
  const next = () => {
    const index =
      selectedTrack === musicData.length - 1 ? 0 : selectedTrack + 1;
    startMusicPlay(index);
    console.log("next");
  };

  const handleChangeShuffle = () => setShuffle(!shuffle);

  const play = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: musicData[0].url,
    });
    setSound(sound);
    setIsPlaying(true);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const pause = async () => {
    if (isPlaying) {
      sound && (await sound.pauseAsync());
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <MusicTrackSlider
        selectedTrack={selectedTrack}
        scrollX={scrollX}
        prev={prev}
        next={next}
      />

      <ProgressBar />
      <View style={styles.mediaButtonsContainer}>
        <ShuffleButton
          shuffle={shuffle}
          handleChangeShuffle={handleChangeShuffle}
        />
        <PlayButtonsBox
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          prev={prev}
          next={next}
        />
        <EqualizerButtonsBox />
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: "10%",
  },

  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
