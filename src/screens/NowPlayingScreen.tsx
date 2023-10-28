import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";
import React, { useEffect, useRef, useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { colors } from "../ui/colors";

import { IMusicData, musicData } from "../utils/data";

const { width, height } = Dimensions.get("window");

const NowPlayingScreen = () => {
  const [shuffle, setShuffle] = useState(false);
  const [musicTrack, setMusicTrack] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleChangeShuffle = () => setShuffle(!shuffle);

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
          <Image source={item.albumCover} style={styles.albumCover} />
        </View>
      </Animated.View>
    );
  };

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setMusicTrack(index);
    });
  }, []);

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

      <Text style={styles.songName}>{musicData[musicTrack].artist}</Text>

      <View style={styles.artistContainer}>
        <Text style={styles.artistName}>{musicData[musicTrack].title}</Text>

        <View style={styles.likeButtonBox}>
          <TouchableOpacity>
            <IonIcons
              name="share-social-outline"
              color={colors.white}
              size={23}
              onPress={() => alert("pressed")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IonIcons
              name="heart-outline"
              color={colors.white}
              size={23}
              onPress={() => alert("pressed")}
            />
          </TouchableOpacity>
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
        <TouchableOpacity>
          <MaterialIcon
            name="shuffle"
            color={shuffle ? colors.white : colors.grey}
            size={23}
            onPress={handleChangeShuffle}
          />
        </TouchableOpacity>
        <View style={styles.playButtonsBox}>
          <TouchableOpacity>
            <IonIcons
              name="play-skip-back-outline"
              size={35}
              color={colors["blue-color-4"]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IonIcons
              name="ios-play-circle"
              size={75}
              color={colors["blue-color-4"]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IonIcons
              name="play-skip-forward-outline"
              size={35}
              color={colors["blue-color-4"]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.equalizerButtonsBox}>
          <TouchableOpacity>
            <MaterialIcon
              style={{ margin: 0, padding: 0 }}
              name="equalizer"
              size={23}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <AntIcon
              style={{ margin: 0, padding: 0 }}
              name="plus"
              size={23}
              color={colors.white}
            />
          </TouchableOpacity>
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
