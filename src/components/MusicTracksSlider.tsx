import {
  Animated,
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { IMusicData, musicData } from "../utils/data";
import { colors } from "../ui/colors";

type Props = {
  selectedTrack: number;
  scrollX: Animated.Value;
  flatListRef: React.LegacyRef<FlatList<IMusicData>> | null;
  prev: () => void;
  next: () => void;
};

const { width } = Dimensions.get("window");

const MusicTracksSlider = ({ selectedTrack, scrollX, flatListRef }: Props) => {
  const renderMusicTracks = () => {
    return (
      <Animated.View style={styles.musicTrackContainer}>
        <View style={[styles.musicTrackBox, styles.elevation]}>
          <Image
            source={{ uri: musicData[selectedTrack].albumCover.uri }}
            style={styles.albumCover}
          />
          <View style={styles.artistContainer}>
            <Text style={styles.songName}>
              {musicData[selectedTrack].title}
            </Text>
            <Text style={styles.artistName}>
              {musicData[selectedTrack].artist}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };
  return (
    <Animated.FlatList
      ref={flatListRef}
      data={musicData}
      renderItem={renderMusicTracks}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
    />
  );
};

const styles = StyleSheet.create({
  musicTrackContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  musicTrackBox: {
    gap: 20,
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  songName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  artistName: {
    color: colors.grey,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MusicTracksSlider;