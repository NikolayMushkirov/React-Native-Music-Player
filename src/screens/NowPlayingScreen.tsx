import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { colors } from "../ui/colors";

import { songsData } from "../utils/data";

const NowPlayingScreen = () => {
  const [shuffle, setShuffle] = useState(false);

  const handleChangeShuffle = () => setShuffle(!shuffle);

  const renderSongs = ({ item, index }) => {
    return (
      <View>
        <Image source={require("../../assets/placeholder.png")} />
      </View>
    );
  };

  return (
    <View>
      <View>
        {/* <FlatList
          data={songsData}
          renderItem={renderSongs}
          keyExtractor={(item) => item.id}
        /> */}

        <Text style={styles.songName}>Song name</Text>
      </View>

      <View style={styles.artistContainer}>
        <Text style={styles.artistName}>Artist name</Text>

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
    </View>
  );
};

export default NowPlayingScreen;

const styles = StyleSheet.create({
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
