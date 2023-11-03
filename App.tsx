import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LaunchScreen from "./src/screens/LaunchScreen";

import { colors } from "./src/ui/colors";
import NowPlayingScreen from "./src/screens/NowPlayingScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <NowPlayingScreen />
    </View>
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
