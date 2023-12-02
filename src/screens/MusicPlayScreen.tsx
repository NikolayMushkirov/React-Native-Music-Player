import React, { useRef, useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";

import { ShuffleButton } from "../components/Buttons";
import ProgressBar from "../components/ProgressBar";
import { EqualizerButtonsBox, PlayButtonsBox } from "../components/Wrappers";

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
    shuffle,
    handleChangeShuffle,
  } = useSound();

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(selectedTrack);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / width);
      setScrollIndex(newIndex);
    });
    return () => scrollX.removeAllListeners();
  }, [scrollX]);

  useEffect(() => {
    if (scrollIndex > selectedTrack) {
      next();
    } else if (scrollIndex < selectedTrack) {
      prev();
    }
  }, [scrollIndex]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <MusicTrackSlider
        selectedTrack={selectedTrack}
        scrollX={scrollX}
        prev={prev}
        next={next}
        flatListRef={flatListRef}
      />

      <ProgressBar
        duration={duration}
        progress={progress}
        position={position}
        playFromPosition={playFromPosition}
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
