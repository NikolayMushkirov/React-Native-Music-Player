import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import MusicListItem from "../components/MusicListItem";
import { musicData } from "../utils/data";

type Props = {};

const MusicList = (props: Props) => {
  return (
    <View style={styles.container}>
      <FlatList

        data={musicData}
        renderItem={({ item }) => (
          <MusicListItem
            albumCover={item.preview}
            title={item.title}
            artist={item.artist}
          />
        )}
      />
    </View>
  );
};

export default MusicList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",

  },


});
