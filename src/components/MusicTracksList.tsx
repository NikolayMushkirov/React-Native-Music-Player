import { StyleSheet, Image, View, Animated, Dimensions } from "react-native";
import React from "react";
import { IMusicData, musicData } from "../utils/data";
const { width } = Dimensions.get("window");
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
        <Image source={{ uri: item.preview.uri }} style={styles.albumCover} />
      </View>
    </Animated.View>
  );
};

export { renderMusicTracks };

const styles = StyleSheet.create({
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
});
