import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../ui/colors";
type Props = {};

const ProgressBar = (props: Props) => {
  return (
    <View>
      <View>
        <Slider
          style={styles.progressBar}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor={colors["blue-color-4"]}
          minimumTrackTintColor={colors["blue-color-4"]}
          maximumTrackTintColor="#fff"
          onSlidingComplete={() => {}}
        />
      </View>
      <View style={styles.progressDurationContainer}>
        <Text style={styles.progressDuration}>00:00</Text>
        <Text style={styles.progressDuration}>00:00</Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressDuration: {
    color: colors.grey,
  },
  progressDurationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
