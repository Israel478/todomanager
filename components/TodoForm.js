import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, ActivityIndicator, ImageBackground, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../lib/features/TodoList/service"; // You may want to rename this function to addFootballer or addItem

export default function FootballerForm({ navigation }) {
  const { loading, error } = useSelector((state) => state.todoList); // Adjust the Redux slice to store footballers
  const dispatch = useDispatch();
  const [footballer, setFootballer] = React.useState(""); // Changed from "item" to "footballer"
  const [position, setPosition] = React.useState(""); // Added state for footballer position
  const [fadeInAnim] = React.useState(new Animated.Value(0));

  // Animation effect for fade-in when the form is loaded
  React.useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  function saveFootballer() {
    // Validate input before saving
    if (!footballer || !position) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    addTodo({
      title: footballer, // The footballer's name
      completed: false,   // You may handle completed differently for footballers
      position: position, // Add position field
    });
    navigation.goBack();
  }

  function clearForm() {
    setFootballer("");
    setPosition("");
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Adding Footballer...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Updated background image URL
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Add a Footballer</Text>

        <TextInput
          placeholder="Enter footballer's name"
          placeholderTextColor="#aaa"
          value={footballer}
          onChangeText={setFootballer}
          style={styles.input}
        />

        <View style={styles.positionButtons}>
          <TouchableOpacity
            style={[styles.positionButton, position === "Forward" && styles.selectedPosition]}
            onPress={() => setPosition("Forward")}
          >
            <Text style={styles.positionButtonText}>Forward</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.positionButton, position === "Midfielder" && styles.selectedPosition]}
            onPress={() => setPosition("Midfielder")}
          >
            <Text style={styles.positionButtonText}>Midfielder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.positionButton, position === "Defender" && styles.selectedPosition]}
            onPress={() => setPosition("Defender")}
          >
            <Text style={styles.positionButtonText}>Defender</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.positionButton, position === "Goalkeeper" && styles.selectedPosition]}
            onPress={() => setPosition("Goalkeeper")}
          >
            <Text style={styles.positionButtonText}>Goalkeeper</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveFootballer}
          >
            <Text style={styles.saveButtonText}>Save Footballer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearForm}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 18,
  },
  error: {
    color: "red",
    backgroundColor: "#F0F0F0",
    padding: 10,
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  title: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    color: "#333",
    marginBottom: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  positionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  positionButton: {
    backgroundColor: "#B0BEC5",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
  },
  selectedPosition: {
    backgroundColor: "#28A745", // Green color for selected position
  },
  positionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  clearButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#6B8E23",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
