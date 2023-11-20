import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const MusicListItem = ({ albumCover, title, artist }) => {
  const placeholder = require("../../assets/musiumLogo.png");
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image style={styles.albumCover} source={placeholder} />
        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
      </View>
    </View>
  );
};

export default MusicListItem;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6
  },
  container: {
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  albumCover: {
    width: 100,
    height: 100,
  },
  textBox: {
    flex: 1,
    flexDirection: "column",
    gap: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  artist: {
    fontSize: 16,
    fontWeight: "500",
  },
});
