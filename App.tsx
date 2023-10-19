import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LaunchScreen from "./src/screens/LaunchScreen";
import { PlusButton } from "./src/components/buttons/Buttons";
import { colors } from "./src/ui/colors";
import SongScreen from "./src/screens/SongScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <LaunchScreen /> */}
      <SongScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: colors["background-dark"],
    alignItems: "center",
    justifyContent: "center",
  },
});
