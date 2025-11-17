"use client";

import { useTicTacToeStore } from "@/store/useTicTacToeStore";
import Square from "./Square";

export default function Board() {
  const { board, currentPlayer, winner, makeMove, resetGame } =
    useTicTacToeStore();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mt-6">
        {winner
          ? winner === "Draw"
            ? "Game Draw!"
            : `Winner: ${winner}`
          : `Current Player: ${currentPlayer}`}
      </h2>

      <div className="tic-board">
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => makeMove(index)} />
        ))}
      </div>

      <button className="tic-reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
