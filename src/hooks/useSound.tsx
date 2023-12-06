import { useEffect, useState } from "react";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { musicData } from "../utils/data";

const useSound = () => {
  const [sound, setSound] = useState<Sound | undefined | null>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState(0);
  const [musicTrackSource, setMusicTrackSource] = useState(
    musicData[selectedTrack].url
  );

  const [position, setPosition] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [progress, setProgress] = useState(0);
  console.log(selectedTrack, "selectedTrack");

  const [shuffle, setShuffle] = useState(false);

  const startMusicPlay = (index: number) => {
    if (index !== null) {
      setSelectedTrack(index);
      setMusicTrackSource(musicData[index].url);
    } else {
      setMusicTrackSource("");
    }
  };

  const prev = () => {
    const index = selectedTrack === 0 ? 0 : selectedTrack - 1;

    startMusicPlay(index);
  };
  const next = () => {
    const index =
      selectedTrack === musicData.length - 1
        ? selectedTrack
        : selectedTrack + 1;

    startMusicPlay(index);
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

  const playFromPosition = async (progress: number) => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        console.log(progress, "progress");
        const milliSec = Math.ceil(status.durationMillis * progress);
        await sound.setPositionAsync(milliSec);
        calcPositionProgress();
      }
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
    const { sound } = await Audio.Sound.createAsync({ uri: musicTrackSource });
    const status = await sound.getStatusAsync();
    if (status.isLoaded && status.durationMillis) {
      setDuration(getMusicTrackTime(status.durationMillis));
      setSound(sound);
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
    if (status?.isLoaded && status.durationMillis) {
      const progress = status?.positionMillis / status?.durationMillis;
      console.log(progress, "progress");
      setPosition(getMusicTrackTime(status?.positionMillis));
      setProgress(progress);
    }

    if (progress === 1) {
      pause();
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
    shuffle,
    handleChangeShuffle,
    setSelectedTrack,
    startMusicPlay,
  };
};

export default useSound;
