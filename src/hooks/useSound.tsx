import React, { useEffect, useState, useRef } from "react";
import {
  Audio,
  InterruptionModeIOS,
  InterruptionModeAndroid,
  AVPlaybackSource,
  AVPlaybackStatusError,
  AVPlaybackStatus,
} from "expo-av";
import { Sound } from "expo-av/build/Audio";

const useSound = (initSource: AVPlaybackSource) => {
  const [source, setSource] = useState<AVPlaybackSource>(initSource);
  const [sound, setSound] = useState<Sound | null>(null);
  const [duration, setDuration] = useState("00:00");
  const [position, setPosition] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finishFunc, setFinishFunc] = React.useState(() => {});
  const [shuffle , setShuffle] = useState(false)

  const play = async () => {
    if (!isPlaying) {
      sound && (await sound.playAsync());
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (isPlaying) {
      sound && (await sound.pauseAsync());
      setIsPlaying(false);
    }
  };

  const handleChangeShuffle = () => setShuffle(!shuffle)

  const playFromPosition = async (position: string) => {
    if (sound) {
      const status = await sound.getStatusAsync();
      const milliSec = Math.ceil(status.durationMillis * progress);
      await sound.setPositionAsync(milliSec);
      calcPositionProgress();
    }
  };

  const getMusicTrackTime = (milliSec: number): string => {
    const min = Math.floor(milliSec / 60000);
    const sec = ((milliSec % 60000) / 1000).toFixed(0);
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(source);
    const status: AVPlaybackStatus = await sound.getStatusAsync();
    setDuration(getMusicTrackTime(status.durationMillis));
    setSound(sound);

    if (source.shouldPlay) {
      sound && (await sound.playAsync());
      setIsPlaying(true);
    }
  };

  const unloadSound = async () => {
    setIsPlaying(false);
    setPosition("00:00");
    setProgress(0);
    await sound?.unloadAsync();
    setSound(null);
  };

  const calcPositionProgress = async () => {
    const status = await sound?.getStatusAsync();
    const progress = status?.positionMillis / status?.durationMillis;

    setPosition(getMusicTrackTime(status.positionMillis));
    setProgress(progress);

    if (progress === 1) {
      pause();
      finishFunc();
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  useEffect(() => {
    sound && unloadSound();
    source && loadSound();
  }, [source]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(async () => {
        await calcPositionProgress();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return {
    isPlaying,
    duration,
    setSource,
    play,
    pause,
    position,
    progress,
    playFromPosition,
    setFinishFunc,
    shuffle,
    handleChangeShuffle
  };
};

export default useSound;
