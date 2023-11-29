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
import { musicData } from "../utils/data";

const useSound = () => {
  const [sound, setSound] = useState<Sound | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [musicTrackSource, setMusicTrackSource] = useState<{
    uri: string;
  } | null>(null);

  const [duration, setDuration] = useState("00:00");
  const [position, setPosition] = useState("00:00");
  const [progress, setProgress] = useState(0);

  const [finishFunc, setFinishFunc] = useState(() => {});

  const [scrollIndex, setScrollIndex] = useState(selectedTrack);

  const [shuffle, setShuffle] = useState(false);

  const startMusicPlay = (index: number) => {
    if (index !== null) {
      setMusicTrackSource({
        uri: musicData[selectedTrack].url,
      });
    } else {
      setMusicTrackSource(null);
    }
    setSelectedTrack(index);
  };

  const prev = () => {
    const index =
      selectedTrack === 0 ? musicData.length - 1 : selectedTrack - 1;
    startMusicPlay(index);
  };
  const next = () => {
    const index =
      selectedTrack === musicData.length - 1 ? 0 : selectedTrack + 1;
    startMusicPlay(index);
    console.log("next");
  };

  const handleChangeShuffle = () => setShuffle(!shuffle);

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
    const { sound } = await Audio.Sound.createAsync({
      uri: musicData[selectedTrack].url,
    });
    const status: AVPlaybackStatus = await sound.getStatusAsync();
    setDuration(getMusicTrackTime(status.durationMillis));
    setSound(sound);

    if (musicTrackSource?.shouldPlay) {
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
    if (status?.isLoaded) {
      const progress = status?.positionMillis / status?.durationMillis;
      console.log(progress, "progress");

      setPosition(getMusicTrackTime(status?.positionMillis));
      setProgress(progress);
    }

    if (progress === 1) {
      pause();
      finishFunc();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
    musicTrackSource && loadSound();
  }, [musicTrackSource]);

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
    selectedTrack,
    duration,
    play,
    pause,
    prev,
    next,
    position,
    progress,
    playFromPosition,
    setFinishFunc,
    shuffle,
    handleChangeShuffle,
  };
};

export default useSound;
