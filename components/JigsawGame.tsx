"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import PuzzlePiece from "./PuzzlePiece";
import { PuzzleCharacter, characterImageUrl } from "@/lib/animals";
import { playPop, playSuccessChime, speakThai } from "@/lib/sound";

type Props = {
  character: PuzzleCharacter;
  pieceCount: PieceCount;
  onComplete?: () => void;
  onBack: () => void;
  onRestart: () => void;
  onRestartKey: number;
  sessionProgress?: { round: number; total: number };
  onNextRound?: () => void;
};

export type PieceCount = 4 | 6 | 8 | 9;

type Piece = {
  id: number;
  row: number;
  col: number;
  correctX: number;
  correctY: number;
  x: number;
  y: number;
  placed: boolean;
  rotation: number;
  near: boolean;
};

const CELL = 104;
const SNAP_THRESHOLD = 42;
const BOARD_PAD = 16;
const TRAY_GAP = 16;
const GRID_DIMENSIONS: Record<PieceCount, { rows: number; cols: number }> = {
  4: { rows: 2, cols: 2 },
  6: { rows: 2, cols: 3 },
  8: { rows: 2, cols: 4 },
  9: { rows: 3, cols: 3 },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function JigsawGame({
  character,
  pieceCount,
  onBack,
  onComplete,
  onRestart,
  onRestartKey,
  sessionProgress,
  onNextRound,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageViewportRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [hintStep, setHintStep] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const { rows, cols } = GRID_DIMENSIONS[pieceCount];
  const layout = viewport.width >= 760 ? "row" : "col";
  const boardWidth = CELL * cols;
  const boardHeight = CELL * rows;
  const boardBoxWidth = boardWidth + BOARD_PAD * 2;
  const boardBoxHeight = boardHeight + BOARD_PAD * 2;
  const totalPieces = pieceCount;
  const trayCols = totalPieces <= 4 ? 2 : 3;
  const trayRows = Math.ceil(totalPieces / trayCols);
  const trayWidth = trayCols * CELL + 32;
  const trayHeight = trayRows * CELL + 32;

  const boardOrigin =
    layout === "row" ? { x: 0, y: Math.max(0, (trayHeight - boardBoxHeight) / 2) } : { x: Math.max(0, (trayWidth - boardBoxWidth) / 2), y: 0 };
  const trayOrigin =
    layout === "row"
      ? { x: boardBoxWidth + TRAY_GAP, y: Math.max(0, (boardBoxHeight - trayHeight) / 2) }
      : { x: Math.max(0, (boardBoxWidth - trayWidth) / 2), y: boardBoxHeight + TRAY_GAP };

  const stageWidth = layout === "row" ? boardBoxWidth + TRAY_GAP + trayWidth : Math.max(boardBoxWidth, trayWidth);
  const stageHeight = layout === "row" ? Math.max(boardBoxHeight, trayHeight) : boardBoxHeight + TRAY_GAP + trayHeight;
  const scale = viewport.width && viewport.height
    ? Math.min(1.45, (viewport.width - 24) / stageWidth, (viewport.height - 24) / stageHeight)
    : 1;

  useEffect(() => {
    const element = stageViewportRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewport({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list: Piece[] = [];
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          id: idx,
          row: r,
          col: c,
          correctX: boardOrigin.x + BOARD_PAD + c * CELL,
          correctY: boardOrigin.y + BOARD_PAD + r * CELL,
          x: 0,
          y: 0,
          placed: false,
          rotation: Math.random() * 16 - 8,
          near: false,
        });
        idx++;
      }
    }
    const order = shuffle(list.map((p) => p.id));
    order.forEach((id, i) => {
      const row = Math.floor(i / trayCols);
      const col = i % trayCols;
      const p = list.find((pp) => pp.id === id)!;
      p.x = trayOrigin.x + 16 + col * CELL;
      p.y = trayOrigin.y + 16 + row * CELL;
    });
    setPieces(list);
    setDone(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.id, pieceCount, onRestartKey]);

  useEffect(() => {
    setPieces((current) => {
      if (!current.length) return current;
      const trayOrder = current
        .filter((piece) => !piece.placed)
        .sort((a, b) => a.y - b.y || a.x - b.x);
      const traySlots = new Map(trayOrder.map((piece, index) => [piece.id, index]));
      return current.map((piece) => {
        const correctX = boardOrigin.x + BOARD_PAD + piece.col * CELL;
        const correctY = boardOrigin.y + BOARD_PAD + piece.row * CELL;
        if (piece.placed) return { ...piece, correctX, correctY, x: correctX, y: correctY };
        const slot = traySlots.get(piece.id) ?? piece.id;
        return {
          ...piece,
          correctX,
          correctY,
          x: trayOrigin.x + 16 + (slot % trayCols) * CELL,
          y: trayOrigin.y + 16 + Math.floor(slot / trayCols) * CELL,
        };
      });
    });
  }, [layout, boardOrigin.x, boardOrigin.y, trayOrigin.x, trayOrigin.y, trayCols]);

  const toLocal = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerRef.current!.getBoundingClientRect();
      return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale };
    },
    [scale]
  );

  const handlePointerDown = (piece: Piece) => (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    const local = toLocal(e.clientX, e.clientY);
    dragOffset.current = { x: local.x - piece.x, y: local.y - piece.y };
    setDraggingId(piece.id);
  };

  useEffect(() => {
    if (draggingId === null) return;
    function onMove(e: PointerEvent) {
      const local = toLocal(e.clientX, e.clientY);
      setPieces((prev) =>
        prev.map((p) => {
          if (p.id !== draggingId) return p;
          const nx = local.x - dragOffset.current.x;
          const ny = local.y - dragOffset.current.y;
          const dist = Math.hypot(nx - p.correctX, ny - p.correctY);
          return { ...p, x: nx, y: ny, near: dist <= SNAP_THRESHOLD };
        })
      );
    }
    function onUp() {
      setPieces((prev) =>
        prev.map((p) => {
          if (p.id !== draggingId) return p;
          const dist = Math.hypot(p.x - p.correctX, p.y - p.correctY);
          if (dist <= SNAP_THRESHOLD) {
            playPop();
            return { ...p, x: p.correctX, y: p.correctY, placed: true, rotation: 0, near: false };
          }
          return { ...p, near: false };
        })
      );
      setDraggingId(null);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [draggingId, toLocal]);

  useEffect(() => {
    if (pieces.length > 0 && pieces.every((p) => p.placed) && !done) {
      setDone(true);
      playSuccessChime();
      setTimeout(() => {
        confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.4 }, angle: 60, startVelocity: 45 });
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.4 }, angle: 120, startVelocity: 45 });
      }, 150);
      speakThai(character.sound);
      onComplete?.();
    }
  }, [pieces, done, character.sound, onComplete]);

  const placedCount = pieces.filter((p) => p.placed).length;
  const hintCandidates = pieces
    .filter((piece) => !piece.placed)
    .sort((a, b) => {
      const aCorner = (a.row === 0 || a.row === rows - 1) && (a.col === 0 || a.col === cols - 1);
      const bCorner = (b.row === 0 || b.row === rows - 1) && (b.col === 0 || b.col === cols - 1);
      return Number(bCorner) - Number(aCorner) || a.id - b.id;
    });
  const hintedPiece = hintCandidates.length ? hintCandidates[hintStep % hintCandidates.length] : null;

  useEffect(() => {
    setHintStep(0);
  }, [character.id, pieceCount, onRestartKey, placedCount]);

  useEffect(() => {
    if (hintCandidates.length < 2) return;
    const timer = window.setInterval(() => setHintStep((step) => step + 1), 6500);
    return () => window.clearInterval(timer);
  }, [hintCandidates.length, placedCount]);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
      <div className="flex w-full max-w-6xl shrink-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button onClick={onBack} className="btn-soft">⬅ <span className="hidden sm:inline">กลับ</span></button>
          <button onClick={onRestart} className="btn-soft">🔄 <span className="hidden sm:inline">เริ่มใหม่</span></button>
          <div className="truncate text-base font-bold text-white drop-shadow sm:text-xl">{character.emoji} {character.nameTh}</div>
        </div>
        <div className="shrink-0 text-base font-bold text-white drop-shadow sm:text-lg">
          ⭐ {placedCount}/{totalPieces}
        </div>
      </div>

      <div ref={stageViewportRef} className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
        <div style={{ width: stageWidth * scale, height: stageHeight * scale, flex: "none" }}>
          <div
            ref={containerRef}
            style={{ width: stageWidth, height: stageHeight, transform: `scale(${scale})`, transformOrigin: "top left", position: "relative" }}
          >
          <div
            className={`absolute rounded-2xl border-4 border-dashed border-white overflow-hidden transition-transform ${done ? "scale-105" : ""}`}
            style={{ left: boardOrigin.x, top: boardOrigin.y, width: boardBoxWidth, height: boardBoxHeight, background: "rgba(255,255,255,.4)" }}
          >
            <div
              className="absolute"
              style={{
                left: BOARD_PAD, top: BOARD_PAD, width: boardWidth, height: boardHeight,
                backgroundImage: `url(${characterImageUrl(character.emoji)})`,
                backgroundSize: "100% 100%", opacity: 0.2, pointerEvents: "none",
              }}
            />
            {Array.from({ length: totalPieces }).map((_, i) => {
              const r = Math.floor(i / cols);
              const c = i % cols;
              return (
                <div
                  key={i}
                  className={`absolute rounded-md border-2 ${hintedPiece?.id === i ? "hint-slot" : "border-white/70"}`}
                  style={{ left: BOARD_PAD + c * CELL, top: BOARD_PAD + r * CELL, width: CELL, height: CELL }}
                />
              );
            })}
          </div>

          <div
            className="absolute rounded-2xl bg-white/25 border-4 border-white/60"
            style={{ left: trayOrigin.x, top: trayOrigin.y, width: trayWidth, height: trayHeight }}
          />

          {pieces.map((p) => (
            <PuzzlePiece
              key={p.id}
              imageUrl={characterImageUrl(character.emoji)}
              cellSize={CELL}
              boardWidth={boardWidth}
              boardHeight={boardHeight}
              row={p.row}
              col={p.col}
              x={p.x}
              y={p.y}
              rotation={p.rotation}
              placed={p.placed}
              isDragging={draggingId === p.id}
              near={p.near}
              hinted={hintedPiece?.id === p.id}
              onPointerDown={handlePointerDown(p)}
            />
          ))}
          </div>
        </div>
      </div>

      {done && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-sky-950/25 p-4 backdrop-blur-sm">
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-2xl animate-[popup_0.4s_ease]">
            <div className="text-3xl font-extrabold text-pink-500">
              {sessionProgress && sessionProgress.round === sessionProgress.total
                ? "🎉 เล่นครบแล้ว! 🎉"
                : "🎉 เก่งมาก! 🎉"}
            </div>
            {sessionProgress && (
              <div className="text-base font-bold text-emerald-700">
                ด่าน {sessionProgress.round}/{sessionProgress.total}
              </div>
            )}
            <div className="text-xl font-bold text-gray-700">นี่คือ {character.nameTh} {character.emoji}</div>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {sessionProgress && sessionProgress.round < sessionProgress.total && onNextRound ? (
                <>
                  <button onClick={onRestart} className="btn-soft">เล่นภาพนี้อีกครั้ง</button>
                  <button onClick={onNextRound} className="btn-primary">ด่านถัดไป ➜</button>
                </>
              ) : sessionProgress ? (
                <button onClick={onBack} className="btn-primary">จบเกม</button>
              ) : (
                <>
                  <button onClick={onRestart} className="btn-soft">เล่นอีกครั้ง</button>
                  <button onClick={onBack} className="btn-primary">จบเกม</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}