import React, { useRef, useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";

import { colors } from "../ui/colors";

import { musicData } from "../utils/data";
import useSound from "../hooks/useSound";
import { ShuffleButton } from "../components/Buttons";
import ProgressBar from "../components/ProgressBar";
import { EqualizerButtonsBox, PlayButtonsBox } from "../components/Wrappers";
import { renderMusicTracks } from "../components/MusicTracksList";
const { width } = Dimensions.get("window");
const {
  isPlaying,
  duration,
  setSource,
  play,
  pause,
  position,
  progress,
  playFromPosition,
  setFinishFunc,
  handleChangeShuffle,
  shuffle,
} = useSound();

const MusicPlayingScreen = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState(selected);
  const scrollX = useRef(new Animated.Value(0)).current;
  const audioRef = useRef(null);

  const playSound = (index: number | null, shouldPlay) => {
    if (index) {
      setSource({ uri: musicData[index].url, shouldPlay });
    } else {
      setSource(null);
    }

    setSelected(index);
  };

  const onSelect = (index: number | null) => {
    if (index === selected) index = null;
    playSound(index, selected === null || isPlaying);
  };

  const prev = () => {
    const index = selected === 0 ? musicData.length - 1 : selected - 1;
    playSound(index, isPlaying);
  };

  const next = () => {
    const index = selected === musicData.length - 1 ? 0 : selected + 1;
    playSound(index, isPlaying);
  };

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / width);
      setScrollIndex(newIndex);
    });
    return () => scrollX.removeAllListeners();
  }, [scrollX]);

  useEffect(() => {
    if (scrollIndex > selected) {
      next();
    } else if (scrollIndex < selected) {
      prev();
    }
  }, [scrollIndex]);

  useEffect(() => {
    if (ref.current && selected) {
      ref.current.scrollToIndex({ selected });
    }
  }, [selected]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Animated.FlatList
        data={musicData}
        renderItem={renderMusicTracks}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
      <Text style={styles.songName}>Artist name</Text>
      <View style={styles.artistContainer}>
        <Text style={styles.artistName}>Title</Text>
      </View>
      <ProgressBar />
      <View style={styles.mediaButtonsContainer}>
        <ShuffleButton
          shuffle={shuffle}
          handleChangeShuffle={handleChangeShuffle}
        />
        <PlayButtonsBox isPlaying={isPlaying} play={play} pause={pause} />
        <EqualizerButtonsBox />
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayingScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: "10%",
  },

  artistContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  songName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  artistName: {
    color: colors.grey,
    fontSize: 16,
    fontWeight: "bold",
  },
});
