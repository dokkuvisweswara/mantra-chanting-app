"use client";

import React, { useState } from "react";
import { devotionalSongs } from "@/lib/audioSongs";
import AudioPlayer from "@/components/audio/AudioPlayer";

export default function SongsPage() {
  const [selectedSong, setSelectedSong] = useState(devotionalSongs[0]);

  return (
    <main className="min-h-screen bg-linear-to-b from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            🎵 Devotional Songs
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Sacred bhajans and mantras for spiritual uplift
          </p>
        </div>

        {/* Audio Player - Position Absolute Overlay */}
        <div className="fixed bottom-4 left-4 right-4 h-96 z-50">
          <AudioPlayer
            title={selectedSong.title}
            artist={selectedSong.artist}
            duration={selectedSong.duration}
            image={selectedSong.image}
            audioUrl={selectedSong.audioUrl}
          />
        </div>

        {/* Main layout: song grid */}
        <div className="grid grid-cols-1 mb-8">
          {/* Song Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {devotionalSongs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className={`p-4 rounded-lg transition-all text-left cursor-pointer ${
                    selectedSong.id === song.id
                      ? "bg-linear-to-r from-orange-400 to-yellow-400 shadow-lg scale-105"
                      : "bg-white dark:bg-gray-800 hover:shadow-md hover:scale-102"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl sm:text-4xl">{song.image}</div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-bold truncate ${
                          selectedSong.id === song.id
                            ? "text-gray-900"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {song.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm truncate ${
                          selectedSong.id === song.id
                            ? "text-gray-800"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-xs line-clamp-2 ${
                      selectedSong.id === song.id
                        ? "text-gray-800"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {song.description}
                  </p>
                  <div
                    className={`text-xs mt-2 font-medium ${
                      selectedSong.id === song.id ? "text-gray-800" : "text-gray-500 dark:text-gray-500"
                    }`}
                  >
                    ⏱️ {song.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-md min-h-80 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Devotional Music
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Devotional music, or bhajans, are sacred songs that connect us to the divine. These timeless melodies
            have been sung for centuries across different spiritual traditions. Whether you seek peace, joy, or
            deeper spiritual connection, these songs serve as powerful tools for meditation and prayer.
          </p>
        </div>
      </div>
    </main>
  );
}
