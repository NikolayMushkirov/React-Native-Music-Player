import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import LaunchScreen from "./src/screens/LaunchScreen";

import { colors } from "./src/ui/colors";
import MusicPlayScreen from "./src/screens/MusicPlayScreen";
import MusicListScreen from "./src/screens/MusicListScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {/* <MusicList/> */}

      <MusicPlayScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background-dark"],
    alignItems: "center",
    justifyContent: "center",
  },
});
