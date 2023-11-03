import React, { useEffect, useState, useRef } from "react";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";

const useSound = (initSource) => {
  const [source, setSource] = useState();
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState("00:00");
  const [position, setPosition] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    if (!isPlaying) {
      sound && (await sound.playAsync());
      setIsPlaying(true)
    }
  };

  const pause =  async () => {
    if(isPlaying) {
      sound && (await sound.pauseAsync());
      setIsPlaying(false)
    }
  }
};

export default useSound;
