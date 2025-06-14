import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioPlayerProps {
  src?: string;
  onEnded?: () => void;
}

export const useAudioPlayer = ({ src, onEnded }: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize audio element
  useEffect(() => {
    if (src) {
      audioRef.current = new Audio(src);
      const audio = audioRef.current;

      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleEnded = () => {
        setIsPlaying(false);
        onEnded?.();
      };

      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      };
    }
  }, [src, onEnded]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(async () => {
    if (audioRef.current && !isLoading) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  }, [isLoading]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const skipForward = useCallback((seconds: number = 10) => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + seconds, duration);
      seek(newTime);
    }
  }, [duration, seek]);

  const skipBackward = useCallback((seconds: number = 10) => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
      seek(newTime);
    }
  }, [seek]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    play,
    pause,
    togglePlayPause,
    seek,
    skipForward,
    skipBackward,
    changeVolume,
  };
};