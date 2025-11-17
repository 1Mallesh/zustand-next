"use client";

import { create } from "zustand";

type Player = "X" | "O";
type SquareValue = Player | null;

interface TicTacToeStore {
  board: SquareValue[];
  currentPlayer: Player;
  winner: Player | "Draw" | null;
  makeMove: (index: number) => void;
  resetGame: () => void;
}

export const useTicTacToeStore = create<TicTacToeStore>((set, get) => ({
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,

  makeMove: (index) => {
    const { board, currentPlayer, winner } = get();

    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let gameWinner = null;
    winPatterns.forEach(([a, b, c]) => {
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        gameWinner = newBoard[a];
      }
    });

    if (!gameWinner && newBoard.every((s) => s)) {
      gameWinner = "Draw";
    }

    set({
      board: newBoard,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      winner: gameWinner,
    });
  },

  resetGame: () =>
    set({
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
    }),
}));
