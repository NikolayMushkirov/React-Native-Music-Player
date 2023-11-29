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
import useSound from "../hooks/useSound";

const { width } = Dimensions.get("window");

const MusicPlayScreen = () => {
  const {
    isPlaying,
    selectedTrack,
    play,
    pause,
    prev,
    next,
    duration,
    position,
    progress,
    playFromPosition,
    setFinishFunc,
    shuffle,
    handleChangeShuffle,
  } = useSound();
  const scrollX = useRef(new Animated.Value(0)).current;
  const audioRef = useRef(null);

  return (
    <SafeAreaView style={styles.wrapper}>
      <MusicTrackSlider
        selectedTrack={selectedTrack}
        scrollX={scrollX}
        prev={prev}
        next={next}
      />

      <ProgressBar
        duration={duration}
        progress={progress}
        position={position}
      />
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
