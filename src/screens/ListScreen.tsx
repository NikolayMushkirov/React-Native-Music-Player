import { FlatList, StyleSheet, View } from "react-native";

import MusicListItem from "../components/MusicListItem";
import { musicData } from "../utils/data";

type Props = {};

const ListScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={musicData}
        renderItem={({ item }) => (
          <MusicListItem
            albumCover={item.albumCover}
            title={item.title}
            artist={item.artist}
          />
        )}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
});
