import { TouchableOpacity, Text } from "react-native";

export enum SquareValue {
  Empty = 0,
  X = 1,
  O = 2,
}

const SquareHeight = 50;

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  const displayValue = () => {
    if (value === SquareValue.Empty) return " ";
    if (value === SquareValue.X) return "X";
    return "O";
  };

  return (
    <TouchableOpacity
      onPress={onSquareClick}
      style={{
        justifyContent: "center",
        width: SquareHeight,
        height: SquareHeight,
        backgroundColor: "gray",
        borderColor: "black",
        borderWidth: 2,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: SquareHeight - 15 }}>
        {displayValue()}
      </Text>
    </TouchableOpacity>
  );
}
