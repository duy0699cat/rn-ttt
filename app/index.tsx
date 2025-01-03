import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Square, { SquareValue } from "@/components/BoardComponents";
import { router } from "expo-router";

export default function App() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Choose rows and columns for the tic-tac-toe board:
          </Text>
          <View style={styles.stepContainer}>
            <TextInput
              style={styles.input}
              placeholder="Rows number"
              keyboardType="numeric"
              value={rows}
              onChangeText={setRows}
              maxLength={2}
            />
            <TextInput
              style={styles.input}
              placeholder="Columns number"
              keyboardType="numeric"
              value={columns}
              onChangeText={setColumns}
              maxLength={2}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!rows || !columns) return; // Add validation
              router.push({
                pathname: "/game",
                params: {
                  rows: rows,
                  columns: columns,
                },
              });
            }}
          >
            <Text style={styles.buttonText}>Create Board</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 120,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
