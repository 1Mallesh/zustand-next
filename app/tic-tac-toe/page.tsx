import Board from "@/components/tic-tac-toe/Board";

export default function TicTacToePage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl text-center font-bold mb-5">Tic-Tac-Toe (Zustand)</h1>
      <Board />
    </div>
  );
}
