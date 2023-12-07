import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../ui/colors";
type Props = {
  duration: string;
  position: string;
  progress: number;
  playFromPosition: (progress: number) => Promise<void>;
};

const ProgressBar = ({
  duration,
  position,
  progress,
  playFromPosition,
}: Props) => {
  return (
    <View>
      <View>
        <Slider
          style={styles.progressBar}
          value={progress}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor={colors["blue-color-4"]}
          minimumTrackTintColor={colors["blue-color-4"]}
          maximumTrackTintColor="#fff"
          onSlidingComplete={(position) => playFromPosition(position)}
        />
      </View>
      <View style={styles.progressDurationContainer}>
        <Text style={styles.progressDuration}>{position}</Text>
        <Text style={styles.progressDuration}>{duration}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
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
