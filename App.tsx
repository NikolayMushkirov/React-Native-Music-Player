import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import LaunchScreen from "./src/screens/LaunchScreen";

import { colors } from "./src/ui/colors";
import MusicPlayingScreen from "./src/screens/MusicPlayingScreen";
import MusicList from "./src/screens/MusicList";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <MusicList/>

      {/* <MusicPlayingScreen /> */}
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
