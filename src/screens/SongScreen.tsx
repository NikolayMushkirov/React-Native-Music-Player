import { StyleSheet, Text, View, Image } from "react-native";
import { useProgress } from "react-native-track-player";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { colors } from "../ui/colors";

const SongScreen = () => {
  return (
    <View>
      <View>
        <Image source={require("../../assets/placeholder.png")} />
        <Text style={styles.songName}>Song name</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.artistName}>Artist name</Text>
        <View style={styles.buttonBox}>
          <AntIcon.Button
            name="sharealt"
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
          <AntIcon.Button
            name="hearto"
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
        </View>
      </View>

      <View>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          thumbTintColor={colors["blue-color-4"]}
          minimumTrackTintColor={colors["blue-color-4"]}
          maximumTrackTintColor="#fff"
        />
      </View>

      <View style={styles.mediaButtonsContainer}>
        <MaterialIcon.Button
          name="shuffle"
          backgroundColor="#000"
          onPress={() => alert("pressed")}
        />
        <View style={styles.playButtonsBox}>
          <AntIcon.Button
            name="fastbackward"
            size={20}
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
          <AntIcon.Button
            name="playcircleo"
            size={60}
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
          <AntIcon.Button
            name="fastforward"
            size={20}
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
        </View>
        <View style={styles.equalizerButtonsBox}>
          <MaterialIcon.Button
            style={{ margin: 0, padding: 0 }}
            name="equalizer"
            size={20}
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
          <AntIcon.Button
            style={{ margin: 0, padding: 0 }}
            name="plus"
            size={20}
            backgroundColor="#000"
            onPress={() => alert("pressed")}
          />
        </View>
      </View>
    </View>
  );
};

export default SongScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonBox: {
    flexDirection: "row",
    gap: 5,
  },
  playButtonsBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  equalizerButtonsBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  songName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  artistName: {
    color: "#8A9A9D",
    fontSize: 16,
    fontWeight: "bold",
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
});
