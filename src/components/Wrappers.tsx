import React from "react";
import { View, StyleSheet } from "react-native";
import {
  EqualizerButton,
  HeartButton,
  PauseButton,
  PlayButton,
  PlusButton,
  ShareButton,
  SkipBackButton,
  SkipForwardButton,
} from "./Buttons";

type Props = {
  isPlaying: boolean;
  pause: () => Promise<void>;
  play: () => Promise<void>;
  next: () => void;
  prev: () => void;
};
const LikeButtonsBox = () => {
  return (
    <View style={styles.likeButtonsBox}>
      <ShareButton />
      <HeartButton />
    </View>
  );
};

const PlayButtonsBox = ({ isPlaying, pause, play, next, prev }: Props) => {
  return (
    <View style={styles.playButtonsBox}>
      <SkipBackButton prev={prev} />
      {isPlaying ? <PauseButton pause={pause} /> : <PlayButton play={play} />}
      <SkipForwardButton next={next} />
    </View>
  );
};

const EqualizerButtonsBox = () => {
  return (
    <View style={styles.equalizerButtonsBox}>
      <EqualizerButton />
      <PlusButton />
    </View>
  );
};

export { LikeButtonsBox, EqualizerButtonsBox, PlayButtonsBox };

const styles = StyleSheet.create({
  likeButtonsBox: {
    flexDirection: "row",
    gap: 15,
  },
  playButtonsBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  equalizerButtonsBox: {
    flexDirection: "row",
    gap: 12,
  },
});
