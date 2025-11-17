"use client";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className={`tic-square ${value ? value : ""}`}
    >
      {value}
    </button>
  );
}
