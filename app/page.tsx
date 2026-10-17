"use client";

import { useState } from "react";
import { CHARACTERS } from "@/lib/animals";
import JigsawGame, { PieceCount } from "@/components/JigsawGame";

const PIECE_OPTIONS: { count: PieceCount; label: string; emoji: string }[] = [
  { count: 4, label: "ง่าย", emoji: "🌱" },
  { count: 6, label: "กำลังสนุก", emoji: "🌼" },
  { count: 8, label: "ท้าทาย", emoji: "⭐" },
  { count: 9, label: "เก่งมาก", emoji: "🚀" },
];
const CHARACTER_CATEGORIES = ["ทั้งหมด", ...Array.from(new Set(CHARACTERS.map((character) => character.category ?? "สัตว์")))];

export default function HomePage() {
  const [pieceCount, setPieceCount] = useState<PieceCount>(4);
  const [roundsToPlay, setRoundsToPlay] = useState(5);
  const [sessionTotal, setSessionTotal] = useState<number | null>(null);
  const [roundNumber, setRoundNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);
  const [stars, setStars] = useState(0);

  const selectedCharacter = CHARACTERS.find((character) => character.id === selectedCharacterId) || null;
  const normalizedSearch = searchQuery.trim().toLocaleLowerCase();
  const visibleCharacters = CHARACTERS.filter((character) => {
    const category = character.category ?? "สัตว์";
    const matchesCategory = selectedCategory === "ทั้งหมด" || category === selectedCategory;
    return matchesCategory && character.nameTh.toLocaleLowerCase().includes(normalizedSearch);
  });

  function pickRandomCharacter(excludeId?: string) {
    const choices = CHARACTERS.filter((character) => character.id !== excludeId);
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function startRandomSession() {
    setSessionTotal(roundsToPlay);
    setRoundNumber(1);
    setRestartKey((key) => key + 1);
    setSelectedCharacterId(pickRandomCharacter().id);
  }

  function goToNextRound() {
    setRoundNumber((round) => round + 1);
    setSelectedCharacterId((currentId) => pickRandomCharacter(currentId ?? undefined).id);
  }

  function returnToSelection() {
    setSessionTotal(null);
    setRoundNumber(1);
    setSelectedCharacterId(null);
  }

  if (selectedCharacter) {
    return (
      <main className="h-dvh w-full overflow-hidden bg-gradient-to-br from-sky-300 via-indigo-200 to-pink-200">
        <JigsawGame
          character={selectedCharacter}
          pieceCount={pieceCount}
          onBack={returnToSelection}
          onComplete={() => setStars((s) => s + 1)}
          onRestart={() => setRestartKey((k) => k + 1)}
          onRestartKey={restartKey}
          sessionProgress={sessionTotal === null ? undefined : { round: roundNumber, total: sessionTotal }}
          onNextRound={sessionTotal === null ? undefined : goToNextRound}
        />
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-gradient-to-br from-sky-300 via-indigo-200 to-pink-200 flex flex-col items-center py-8 px-4 gap-7 sm:py-10">
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">🧩 จิ๊กซอว์มหาสนุก</h1>
        <p className="text-white/90 text-lg md:text-xl mt-2 font-medium">
          ลากชิ้นส่วนมาต่อให้ครบ แล้วมาดูกันว่าภาพนี้คืออะไร!
        </p>
        {stars > 0 && <div className="mt-3 text-2xl">{"⭐".repeat(Math.min(stars, 10))}</div>}
      </header>

      <section className="w-full max-w-3xl">
        <h2 className="mb-3 text-center text-xl font-bold text-white drop-shadow">เลือกจำนวนชิ้น</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {PIECE_OPTIONS.map((option) => (
            <button
              key={option.count}
              onClick={() => setPieceCount(option.count)}
              className={`level-btn flex min-h-16 items-center justify-center gap-2 ${pieceCount === option.count ? "level-btn-active" : ""}`}
              aria-pressed={pieceCount === option.count}
            >
              <span className="text-xl" aria-hidden="true">{option.emoji}</span>
              <span className="text-left">
                <span className="block text-lg leading-tight">{option.count} ชิ้น</span>
                <span className="block text-xs font-semibold opacity-75">{option.label}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex w-full max-w-3xl flex-col items-center gap-3 rounded-3xl border-2 border-white/80 bg-white/85 p-4 shadow-xl sm:flex-row sm:justify-between sm:px-6">
        <label htmlFor="round-count" className="text-lg font-bold text-gray-700">เล่นต่อเนื่องกี่ด่าน?</label>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <input
            id="round-count"
            type="number"
            min={1}
            max={20}
            value={roundsToPlay}
            onChange={(event) => {
              const value = Number(event.target.value);
              setRoundsToPlay(Math.max(1, Math.min(20, value || 1)));
            }}
            className="h-12 w-20 rounded-xl border-2 border-sky-200 bg-white text-center text-xl font-bold text-gray-700 outline-none focus:border-sky-500"
            aria-label="จำนวนด่าน ตั้งแต่ 1 ถึง 20 ด่าน"
          />
          <button
            onClick={startRandomSession}
            className="min-h-12 flex-1 rounded-xl bg-emerald-500 px-5 py-3 text-lg font-bold text-white shadow-md transition hover:bg-emerald-600 active:scale-95 sm:flex-none"
          >
            🎲 เล่นทันที
          </button>
        </div>
      </section>

      <section className="w-full max-w-6xl">
        <h2 className="mb-4 text-center text-xl font-bold text-white drop-shadow">
          เลือกตัวละครที่ชอบ <span className="text-base">({visibleCharacters.length} แบบ)</span>
        </h2>
        <label className="mx-auto mb-4 flex w-full max-w-lg items-center gap-3 rounded-2xl border-2 border-white bg-white/90 px-4 py-3 shadow-lg focus-within:border-sky-500">
          <span className="text-xl" aria-hidden="true">🔎</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="ค้นหาตัวละคร เช่น ยูนิคอร์น รถไฟ..."
            className="min-w-0 flex-1 bg-transparent font-semibold text-gray-700 outline-none placeholder:text-gray-400"
            aria-label="ค้นหาตัวละคร"
          />
        </label>
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {CHARACTER_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border-2 px-4 py-2 font-bold transition ${
                selectedCategory === category
                  ? "border-yellow-400 bg-yellow-300 text-gray-800"
                  : "border-white/80 bg-white/80 text-gray-700 hover:bg-white"
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {visibleCharacters.map((character) => (
            <button
              key={character.id}
              onClick={() => {
                setRestartKey((k) => k + 1);
                setSessionTotal(null);
                setRoundNumber(1);
                setSelectedCharacterId(character.id);
              }}
              className="animal-card"
              style={{ background: character.color }}
            >
              <span className="text-5xl">{character.emoji}</span>
              <span className="font-bold text-gray-700">{character.nameTh}</span>
            </button>
          ))}
        </div>
        {visibleCharacters.length === 0 && (
          <p className="py-8 text-center text-lg font-semibold text-white drop-shadow">ไม่พบตัวละครที่ค้นหา</p>
        )}
      </section>
    </main>
  );
}