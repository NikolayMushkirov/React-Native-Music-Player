import React, { useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";

import Slider from "@react-native-community/slider";

import { colors } from "../ui/colors";

import { IMusicData, musicData } from "../utils/data";
import useSound from "../hooks/useSound";
import {
  EqualizerButton,
  HeartButton,
  PauseButton,
  PlayButton,
  PlusButton,
  ShareButton,
  ShuffleButton,
  SkipBackButton,
  SkipForwardButton,
} from "../components/buttons/Buttons";

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

const NowPlayingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const renderMusicTracks = ({
    item,
    index,
  }: {
    item: IMusicData;
    index: number;
  }) => {
    return (
      <Animated.View style={styles.albumCoverContainer}>
        <View style={[styles.albumCoverBox, styles.elevation]}>
          <Image source={item.preview.uri} style={styles.albumCover} />
        </View>
      </Animated.View>
    );
  };

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

        <View style={styles.likeButtonBox}>
          <ShareButton />
          <HeartButton />
        </View>
      </View>

      <View>
        <Slider
          style={styles.progressBar}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor={colors["blue-color-4"]}
          minimumTrackTintColor={colors["blue-color-4"]}
          maximumTrackTintColor="#fff"
          onSlidingComplete={() => {}}
        />
      </View>
      <View style={styles.progressDurationContainer}>
        <Text style={styles.progressDuration}>00:00</Text>
        <Text style={styles.progressDuration}>00:00</Text>
      </View>

      <View style={styles.mediaButtonsContainer}>
        <ShuffleButton
          shuffle={shuffle}
          handleChangeShuffle={handleChangeShuffle}
        />
        <View style={styles.playButtonsBox}>
          <SkipBackButton />
          {isPlaying ? (
            <PauseButton pause={pause} />
          ) : (
            <PlayButton play={play} />
          )}
          <SkipForwardButton />S
        </View>
        <View style={styles.equalizerButtonsBox}>
          <EqualizerButton />
          <PlusButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NowPlayingScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: "10%",
  },

  albumCoverContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  albumCoverBox: {
    width: width,
    height: 350,
  },
  albumCover: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  elevation: {
    elevation: 5,

    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
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
  likeButtonBox: {
    flexDirection: "row",
    gap: 15,
  },
  playButtonsBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  equalizerButtonsBox: {
    flexDirection: "row",
    gap: 12,
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

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressDuration: {
    color: colors.grey,
  },
  progressDurationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
