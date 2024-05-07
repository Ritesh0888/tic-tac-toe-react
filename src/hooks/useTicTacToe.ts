/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useTicTacToe = (boardSize: number) => {
  const initialBoardState = () => Array(boardSize * boardSize).fill(null);
  const [board, setBoard] = useState(initialBoardState());
  const [isXnext, setIsXnext] = useState(true);

  // const winning_patterns = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];

  // Adjust winning patterns for dynamic board size
  const winning_patterns: any[] = [];
  for (let i = 0; i < boardSize; i++) {
    // Rows
    winning_patterns.push(
      Array.from({ length: boardSize }, (_, index) => i * boardSize + index)
    );
    // Columns
    winning_patterns.push(
      Array.from({ length: boardSize }, (_, index) => i + index * boardSize)
    );
  }
  // Diagonals
  winning_patterns.push(
    Array.from({ length: boardSize }, (_, index) => index * (boardSize + 1))
  );
  winning_patterns.push(
    Array.from(
      { length: boardSize },
      (_, index) => (index + 1) * (boardSize - 1)
    )
  );

  const calculateWinner = (currentBoard: any[]) => {
    for (let i = 0; i < winning_patterns.length; i++) {
      const pattern = winning_patterns[i];
      let isWinner = true;
      const firstCellValue = currentBoard[pattern[0]];

      // Check if the first cell in the pattern is not null
      if (firstCellValue !== null) {
        // Check if all cells in the pattern have the same value
        for (let j = 1; j < pattern.length; j++) {
          if (currentBoard[pattern[j]] !== firstCellValue) {
            isWinner = false;
            break;
          }
        }
        // If all cells have the same value, return the winning symbol
        if (isWinner) {
          return firstCellValue;
        }
      }
    }

    return null; // Return null if there's no winner
  };

  const resetGame = () => {
    setBoard(initialBoardState());
  };

  const handleClick = (index: number) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXnext ? "X" : "O";
    setBoard(newBoard);
    setIsXnext(!isXnext);
  };

  const getStatusMsg = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} Wins!`;
    if (!board.includes(null)) return `it's a Draw!`;
    return `player ${isXnext ? "X" : "O"} turn`;
  };

  return {
    board,
    calculateWinner,
    resetGame,
    handleClick,
    getStatusMsg,
  };
};
