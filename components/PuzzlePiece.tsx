"use client";
import { CSSProperties } from "react";

type Props = {
  imageUrl: string;
  cellSize: number;
  boardWidth: number;
  boardHeight: number;
  row: number;
  col: number;
  x: number;
  y: number;
  rotation: number;
  placed: boolean;
  isDragging: boolean;
  near: boolean;
  hinted: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
};

export default function PuzzlePiece({
  imageUrl, cellSize, boardWidth, boardHeight, row, col, x, y, rotation, placed, isDragging, near, hinted, onPointerDown,
}: Props) {
  const style: CSSProperties = {
    position: "absolute",
    width: cellSize,
    height: cellSize,
    left: 0,
    top: 0,
    transform: `translate(${x}px, ${y}px) rotate(${placed ? 0 : rotation}deg) scale(${isDragging ? 1.1 : 1})`,
    transition: isDragging ? "none" : "transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow .2s",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${boardWidth}px ${boardHeight}px`,
    backgroundPosition: `-${col * cellSize}px -${row * cellSize}px`,
    backgroundRepeat: "no-repeat",
    borderRadius: 14,
    boxShadow:
      isDragging && near
        ? "0 0 0 6px rgba(34,197,94,.65), 0 14px 24px rgba(0,0,0,.3)"
        : hinted
        ? "0 0 0 6px rgba(250,204,21,.9), 0 0 24px rgba(250,204,21,.8), 0 8px 18px rgba(0,0,0,.25)"
        : isDragging
        ? "0 14px 24px rgba(0,0,0,.35)"
        : placed
        ? "0 2px 6px rgba(0,0,0,.15)"
        : "0 6px 14px rgba(0,0,0,.25)",
    border: placed ? "2px solid rgba(255,255,255,.9)" : "3px solid white",
    cursor: placed ? "default" : "grab",
    touchAction: "none",
    zIndex: isDragging ? 50 : placed ? 1 : 10,
    userSelect: "none",
  };

  return <div style={style} onPointerDown={placed ? undefined : onPointerDown} />;
}