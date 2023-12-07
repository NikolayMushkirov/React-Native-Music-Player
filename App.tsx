import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { colors } from "./src/ui/colors";
import PlayScreen from "./src/screens/PlayScreen";
import LaunchScreen from "./src/screens/LaunchScreen";
import ListScreen from "./src/screens/ListScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "./src/types/navigator.types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light"/>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="PlayScreen" component={PlayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background-dark"],
  },
});
