import React, { useRef, useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
  Button,
} from "react-native";

import { ShuffleButton } from "../components/Buttons";
import ProgressBar from "../components/ProgressBar";
import { EqualizerButtonsBox, PlayButtonsBox } from "../components/Wrappers";

import MusicTracksSlider from "../components/MusicTracksSlider";
import useSound from "../hooks/useSound";
import { colors } from "../ui/colors";

const { width } = Dimensions.get("window");

const PlayScreen = ({ navigation, route }) => {
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
    setSelectedTrack,
    startMusicPlay,
  } = useSound();
  const trackIndex = route.params.trackIndex;
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const [scrollIndex, setScrollIndex] = useState(selectedTrack);

  const scrollToIndex = () => {
    flatListRef?.current?.scrollToIndex({ index: selectedTrack });
  };

  useEffect(() => {
    startMusicPlay(trackIndex);
  }, []);

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

  // useEffect(() => {
  //   if (flatListRef.current && selectedTrack) {
  //     flatListRef?.current?.scrollToIndex({ index: selectedTrack });
  //   }
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MusicTracksSlider
        selectedTrack={selectedTrack}
        scrollX={scrollX}
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
          scrollToIndex = {scrollToIndex}
        />
        <EqualizerButtonsBox />
      </View>
      <Button title="Back to the list" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "10%",
    backgroundColor: colors["background-dark"],
  },

  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
