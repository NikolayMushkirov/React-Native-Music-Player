import { useEffect, useState } from "react";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { musicData } from "../utils/data";

const useSound = () => {
  const [sound, setSound] = useState<Sound | undefined | null>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState<number | null>(0);
  const [musicTrackSource, setMusicTrackSource] = useState("");

  const [position, setPosition] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [progress, setProgress] = useState(0);

  const [shuffle, setShuffle] = useState(false);

  const handleChangeShuffle = () => setShuffle(!shuffle);

  const initiateMusicPlayback = (index: number) => {
    if (index !== null) {
      setSelectedTrack(index);
      setMusicTrackSource(musicData[index].url);
    }
  };

  const prev = () => {
    if (selectedTrack !== null) {
      const index = selectedTrack === 0 ? 0 : selectedTrack - 1;
      initiateMusicPlayback(index);
    }
  };
  const next = () => {
    if (selectedTrack !== null) {
      const index =
        selectedTrack === musicData.length - 1
          ? selectedTrack
          : selectedTrack + 1;
      initiateMusicPlayback(index);
    }
  };

  const play = async () => {
    if (sound?._loaded && (await sound.playAsync())) {
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (sound?._loaded && (await sound.pauseAsync())) {
      setIsPlaying(false);
    }
  };

  const calcPositionProgress = async () => {
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && status.durationMillis) {
      const progress = status?.positionMillis / status?.durationMillis;
      setPosition(getMusicTrackTime(status?.positionMillis));
      setProgress(progress);
    }

    if (progress === 1) {
      pause();
    }
  };

  const playFromPosition = async (progress: number) => {
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && status?.durationMillis) {
      const milliSec = Math.ceil(status.durationMillis * progress);
      await sound?.setPositionAsync(milliSec);
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
    const { sound } = await Audio.Sound.createAsync({ uri: musicTrackSource });
    const status = await sound.getStatusAsync();
    if (status.isLoaded && status.durationMillis) {
      setSound(sound);
      setDuration(getMusicTrackTime(status.durationMillis));
    }
  };

  const unloadSound = async () => {
    setIsPlaying(false);
    setPosition("00:00");
    setProgress(0);
    await sound?.unloadAsync();
    setSound(null);
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
    initiateMusicPlayback,
    musicTrackSource,
    unloadSound,
    loadSound,
    sound,
  };
};

export default useSound;
