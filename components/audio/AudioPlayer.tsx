"use client";

import React, { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  title: string;
  artist: string;
  duration: string;
  image: string;
  audioUrl: string;
}

export default function AudioPlayer({
  title,
  artist,
  duration,
  image,
  audioUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalTime(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="bg-linear-to-br from-orange-100 to-yellow-50 dark:from-orange-900 dark:to-gray-900 rounded-lg p-4 sm:p-6 shadow-lg min-h-96 flex flex-col">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Section 1: Image, Title, Description */}
      <div className="flex-1 flex flex-col items-center justify-center mb-4 min-h-40">
        <div className="text-5xl sm:text-6xl mb-3">{image}</div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white text-center truncate w-full px-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center truncate">
          {artist}
        </p>
      </div>

      {/* Section 2: Progress bar */}
      <div className="flex-1 flex flex-col justify-center mb-4">
        <input
          type="range"
          min="0"
          max={totalTime || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2 px-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalTime)}</span>
        </div>
      </div>

      {/* Section 3: Volume and Controls */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="mb-4">
          <label className="text-xs text-gray-600 dark:text-gray-400 block mb-2">
            Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-orange-500"
            title="Volume"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePlayPause}
            className="bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button
            onClick={handleMuteToggle}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-full p-3 transition-all"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </div>
  );
}
