import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  TouchableHighlight,
} from "react-native";

import MusicListItem from "../components/MusicListItem";
import { musicData } from "../utils/data";
import { colors } from "../ui/colors";
import useSound from "../hooks/useSound";

type Props = {
  navigation: unknown;
};

const ListScreen = ({ navigation }: Props) => {
  const { setSelectedTrack } = useSound();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={musicData}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("PlayScreen", { trackIndex: index });
            }}
          >
            <MusicListItem
              albumCover={item.albumCover}
              title={item.title}
              artist={item.artist}
            />
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: colors["background-dark"],
  },
});
