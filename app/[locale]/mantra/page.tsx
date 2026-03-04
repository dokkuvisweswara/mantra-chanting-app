"use client";

import React, { useState } from "react";

export default function MantraPage() {
  const [count, setCount] = useState(0);
  const [deity, setDeity] = useState<"hanuman" | "shiva">("hanuman");
  const [language, setLanguage] = useState<
    "english" | "hindi" | "kannada" | "telugu"
  >("english");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const maxCount = 108;
  const handleReset = () => setCount(0);

  // translations organized by deity -> language -> text
  const translations: Record<string, Record<string, string>> = {
    hanuman: {
      english: `tvamasmin kāryaniryōgē
pramāņam harisattama |
hanuman! yatnamāsthāya
duḥkhakşaya karō bhava`,
      hindi: `त्वमस्मिन् कार्यनिर्योगे
प्रमाणं हरिसत्तम |
हनुमन्! यत्नमास्थाय
दुःखक्षय करो भव ।।`,
      kannada: `ತ್ವಮಸ್ಮಿನ್ ಕಾರ್ಯನಿರ್ಯೋಗೇ
ಪ್ರಮಾಣಂ ಹರಿಸತ್ತಮ |
ಹನುಮನ್! ಯತ್ನಮಾಸ്ഥಾಯ
ದುಃಖಕ್ಷಯಕರೋ ಭವ ॥`,
      telugu: `త్వమస్మిన్ కార్యనిర్యోగే
ప్రమాణం హరిసత్తమ |
హనుమన్! యత్నమాస్థాయ
దుఃఖక్షయ కరో భవ ||`,
    },
    // placeholder Shiva entry: paste Shiva mantras later
    shiva: {
      english: `shiva mantra will be added here`,
      hindi: `शिव मंत्र शीघ्र जोड़ा जाएगा`,
      kannada: `ಶಿವ ಮಂತ್ರವನ್ನು ಶೀಘ್ರ ಸೇರಿಸಲಾಗುತ್ತದೆ`,
      telugu: `శివ మంత్రం త్వరలో జోడిస్తాం`,
    },
  };

  const mantra = translations[deity]?.[language] ?? "";

  const handleRecite = () => {
    if (count < maxCount) {
      setCount(count + 1);
    }
  };


  const progress = Math.round((count / maxCount) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            హనుమన్ మంత్రం
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Hanuman Mantra Recitation Counter</p>
        </div>

        {/* Deity selector + Language selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <div className="flex gap-2">
            {[{ key: "hanuman", label: "Hanuman" }, { key: "shiva", label: "Shiva" }].map((d: any) => (
              <button
                key={d.key}
                onClick={() => setDeity(d.key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  deity === d.key ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {[
              { key: "english", label: "English" },
              { key: "hindi", label: "हिन्दी" },
              { key: "kannada", label: "ಕನ್ನಡ" },
              { key: "telugu", label: "తెలుగు" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setLanguage(opt.key as any)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  language === opt.key
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mantra Text */}
        <div className="relative bg-orange-100 dark:bg-orange-900 rounded-lg p-4 sm:p-6 mb-8 text-center">
          <p className="text-xl sm:text-2xl font-semibold text-orange-900 dark:text-orange-100 leading-relaxed whitespace-pre-line">
            {mantra}
          </p>
          {/* playback + mute controls */}
          <div className="absolute top-2 right-2 flex space-x-1">
            <button
              onClick={() => {
                if (typeof window === "undefined" || !window.speechSynthesis) {
                  return;
                }
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                } else {
                  const u = new SpeechSynthesisUtterance(mantra);
                  const langMap: Record<string, string> = {
                    english: "en-US",
                    hindi: "hi-IN",
                    kannada: "kn-IN",
                    telugu: "te-IN",
                  };
                  u.lang = langMap[language] || "en-US";
                  u.volume = isMuted ? 0 : 1;
                  u.onend = () => setIsSpeaking(false);
                  u.onerror = () => setIsSpeaking(false);
                  window.speechSynthesis.speak(u);
                  setIsSpeaking(true);
                }
              }}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
              title={isSpeaking ? "Pause" : "Play"}
            >
              {isSpeaking ? "⏸️" : "▶️"}
            </button>

            <button
              onClick={() => {
                // toggle mute
                const newMute = !isMuted;
                setIsMuted(newMute);
                if (isSpeaking && window.speechSynthesis) {
                  // restart speech with new volume
                  window.speechSynthesis.cancel();
                  if (!newMute) {
                    const u = new SpeechSynthesisUtterance(mantra);
                    const langMap: Record<string, string> = {
                      english: "en-US",
                      hindi: "hi-IN",
                      kannada: "kn-IN",
                      telugu: "te-IN",
                    };
                    u.lang = langMap[language] || "en-US";
                    u.volume = newMute ? 0 : 1;
                    u.onend = () => setIsSpeaking(false);
                    u.onerror = () => setIsSpeaking(false);
                    window.speechSynthesis.speak(u);
                    setIsSpeaking(true);
                  }
                }
              }}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>

        {/* Counter Display with circular progress ring */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-36 sm:w-56 h-36 sm:h-56 mb-6">
            <svg className="w-36 sm:w-56 h-36 sm:h-56 transform -rotate-90" viewBox="0 0 200 200">
              {/* background ring */}
              <circle cx="100" cy="100" r="90" fill="none" strokeWidth="12" className="text-gray-300 dark:text-gray-700" stroke="currentColor" />
              {/* progress ring (strokeDasharray controls fill) */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                strokeWidth="12"
                strokeLinecap="round"
                stroke="url(#progressGradient)"
                strokeDasharray={`${(progress / 100) * 565.48} 565.48`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-5xl font-bold text-orange-600 dark:text-orange-400">
                {count}
              </div>
              <div className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mt-1">/ {maxCount}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">{progress}%</div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {count === maxCount && (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-lg mb-6 text-center font-semibold">
            ✨ అద్భుతమైనది! మీరు 108 సార్లు జపించారు! ✨
          </div>
        )}

        {/* Buttons (stack on small screens for proper alignment) */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <button
            onClick={handleRecite}
            disabled={count >= maxCount}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-bold text-white transition-all duration-200 text-lg ${
              count >= maxCount
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {count === maxCount ? "Complete ✓" : "Recite"}
          </button>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-bold text-white bg-gray-500 hover:bg-gray-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Reset
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            🙏 ఈ మంత్రం రోజూ 108 సార్లు రకించండి
          </p>
          <p className="text-center text-gray-500 dark:text-gray-500 text-xs mt-2">
            Recite this mantra 108 times daily for spiritual benefits
          </p>
        </div>
      </div>
    </main>
  );
}
