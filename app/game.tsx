import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Square, { SquareValue } from "@/components/BoardComponents";
import { useState } from "react";
import { Directions } from "react-native-gesture-handler";

export default function GameScreen() {
  const { rows, columns } = useLocalSearchParams();
  // Convert string params to numbers
  const numRows = parseInt(rows as string, 10);
  const numColumns = parseInt(columns as string, 10);

  const [currentPlayer, setCurrentPlayer] = useState<SquareValue>(
    SquareValue.X
  );
  const [boardState, setBoardState] = useState<SquareValue[][]>(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numColumns }, () => SquareValue.Empty)
    )
  );

  const BoardDirections: { [key: string]: [row: number, col: number] } = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
    NE: [1, 1],
    NW: [-1, 1],
    SE: [1, -1],
    SW: [-1, -1],
  };
  // First fix the recursive counting function
  const countDirectionRecursive = (
    value: SquareValue,
    row: number,
    col: number,
    direction: string
  ): number => {
    // Check bounds first
    const [dRow, dCol] = BoardDirections[direction];
    const newRow = row + dRow;
    const newCol = col + dCol;

    // Stop if we're out of bounds
    if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numColumns) {
      return 0;
    }

    // Stop if we hit a different value
    if (boardState[newRow][newCol] !== value) {
      return 0;
    }

    // Count this match and continue recursively
    return 1 + countDirectionRecursive(value, newRow, newCol, direction);
  };

  const checkWin = (value: SquareValue, row: number, col: number): boolean => {
    const winLength = 5;

    const checkDirectionPair = (dir1: string, dir2: string): boolean => {
      return (
        countDirectionRecursive(value, row, col, dir1) +
          countDirectionRecursive(value, row, col, dir2) +
          1 >=
        winLength
      );
    };

    return (
      checkDirectionPair("N", "S") || // vertical check
      checkDirectionPair("E", "W") || // horizontal
      checkDirectionPair("NE", "SW") || // diagonal
      checkDirectionPair("NW", "SE")
    ); // other diagonal
  };
  const handleClick = (row: number, col: number) => {
    if (boardState[row][col] !== SquareValue.Empty) {
      return; // Square already filled
    }
    //console.log(`Clicked square at row ${row}, col ${col}`);

    const newBoard = boardState.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoardState(newBoard);
    // Check if current move won the game
    if (checkWin(currentPlayer, row, col)) {
      alert(`Player ${currentPlayer === SquareValue.X ? "X" : "O"} wins!`);
      // Optional: reset the board or navigate back
      return;
    }
    setCurrentPlayer(
      currentPlayer === SquareValue.X ? SquareValue.O : SquareValue.X
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, padding: 20 }}>
        Current player: {currentPlayer === SquareValue.X ? "X" : "O"}
      </Text>

      <ScrollView horizontal={true} style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            {boardState.map((row, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                }}
              >
                {row.map((square, j) => (
                  <Square
                    key={`${i}-${j}`}
                    value={square}
                    onSquareClick={() => handleClick(i, j)}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
