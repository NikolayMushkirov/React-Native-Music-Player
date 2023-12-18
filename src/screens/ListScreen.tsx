import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { musicData } from "../utils/data";
import { colors } from "../ui/colors";

import MusicListItem from "../components/MusicListItem";
import { RootStackParamList } from "../types/navigator.types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ListScreen">;
};

const ListScreen = ({ navigation }: Props) => {
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
    paddingTop: "15%",
    backgroundColor: colors["background-dark"],
  },
});
