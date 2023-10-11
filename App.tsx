import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LaunchScreen from "./src/screens/LaunchScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LaunchScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
