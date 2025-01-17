import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, updateTodoStatus, deleteTodo } from "../lib/features/TodoList/service";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TodoList({ navigation }) {
  const { todoList, loading, error } = useSelector((state) => state.todoList);
  const dispatch = useDispatch();
  
  const [fadeInAnim] = useState(new Animated.Value(0)); // For fade-in effect
  const [filter, setFilter] = useState('all'); // Filter state: all, completed, or incomplete

  const { width, height } = useWindowDimensions(); // Get screen width and height

  function changeTodoStatus(todo) {
    updateTodoStatus({ id: todo.id, completed: !todo.completed });
  }

  function handleDelete(id) {
    deleteTodo({ id });
  }

  function handleMarkAllCompleted() {
    todoList.forEach(todo => {
      if (!todo.completed) {
        changeTodoStatus(todo);
      }
    });
  }

  useEffect(() => {
    // Fetch Todos when component is mounted
    getTodos();

    // Apply fade-in animation on component load
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Filter todos based on the selected filter
  const filteredTodos = todoList.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'incomplete') {
      return !todo.completed;
    }
    return true; // 'all'
  });

  if (loading) {
    return (
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Updated background image URL for loading state
        }}
        style={styles.loadingBackground} // Full-screen image for loading state
        resizeMode="cover"
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1976D2" />
          <Text style={styles.loadingText}>Loading...</Text>
          <Text style={styles.welcomeText}>Welcome to my Football app</Text> {/* New welcome text */}
        </View>
      </ImageBackground>
    );
  }
  

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://plus.unsplash.com/premium_photo-1678249465288-0801b8514866?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Updated background image URL for the main screen
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
        <TouchableOpacity
          style={styles.addTodo}
          onPress={() => navigation.navigate("todoForm")}
        >
          <Text style={styles.addTodoText}>Add Player</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Footballers List</Text>

        {/* Search Input */}
        <TextInput 
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="#ddd"
        />

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => setFilter('all')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
            onPress={() => setFilter('completed')}
          >
            <Text style={styles.filterText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'incomplete' && styles.activeFilter]}
            onPress={() => setFilter('incomplete')}
          >
            <Text style={styles.filterText}>Incomplete</Text>
          </TouchableOpacity>
        </View>

        {/* Mark All Completed Button */}
        <TouchableOpacity 
          style={styles.markAllButton}
          onPress={handleMarkAllCompleted}
        >
          <Text style={styles.markAllText}>Mark All as Completed</Text>
        </TouchableOpacity>

        {/* Todo List with Fade-In Animation */}
        <Animated.View style={[styles.todoList, { opacity: fadeInAnim }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredTodos.map((todo, i) => (
              <View style={styles.todoContainer} key={i}>
                <Text
                  style={[styles.todoText, todo.completed && styles.completedTodo]}
                >
                  {todo.title}
                </Text>

                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => changeTodoStatus(todo)}
                    style={styles.iconButton}
                  >
                    <MaterialCommunityIcons
                      name={todo.completed ? "checkbox-marked" : "checkbox-blank"}
                      size={40}
                      color={todo.completed ? "green" : "gray"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(todo.id)}
                    style={styles.iconButton}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={40}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loadingBackground: {
    flex: 1,  // Full-screen background image for loading state
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,  // Ensure the background image fills the screen
    justifyContent: "flex-start", // Top-align content for better layout
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,  // Make the container fill the screen
    alignItems: "center",
    paddingTop: 20, // Provide padding from the top (especially useful for the StatusBar)
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: 'linear-gradient(to right, #FF6F61, #FF3A3A)',  // Gradient effect
    padding: 10,
    borderRadius: 5,
  },
  input: {
    color: "white",
    backgroundColor: "#2C3E50",
    width: "100%",
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    fontSize: 18,
    borderColor: "#555555",
    borderWidth: 1,
  },
  addTodo: {
    backgroundColor: "#FF6F61",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  addTodoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  todoList: {
    width: "100%",
    paddingTop: 10,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2C3E50",
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  todoText: {
    color: "#fff",
    fontSize: 18,
    width: "70%",
  },
  completedTodo: {
    textDecorationLine: "line-through",
    color: "#757575",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    paddingHorizontal: 15,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  error: {
    color: "#fff",
    backgroundColor: "#F44336",
    width: "100%",
    padding: 10,
    textAlign: "center",
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",  // Center the content
    alignItems: "center",      // Center the content horizontally
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: semi-transparent black to darken the background slightly
    width: "100%",
    height: "100%",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
  },
  activeFilter: {
    backgroundColor: "#FF3A3A",
  },
  markAllButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  markAllText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  }
});
