import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

import { useEffect } from "react";
import { getTodos } from "../lib/features/TodoList/service";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { error } from "../lib/features/TodoList/reducers";

export default function TodoList({ navigation }) {
  useEffect(() => {
    getTodos();
  }, []);
  const { todoList, loading, error } = useSelector((state) => state.todoList);

  if(loading === true){
    return <Text style={styles.loading}>Loading...</Text>;
  }
  if(error){
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }
  

  const handleEdite = (e, todo) => {
    console.log("edite", todo);
  };
  const handleDelete = (e, todo) => {
    console.log("delete", todo);
  };
  const handleComplete = (e, todo) => {
    console.log("complete", todo);
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.addTodo}
        title="Add Todo"
        onPress={() => navigation.navigate("todoForm")}
      />
      <Text style={styles.title}>Todolist App!</Text>
      <TextInput placeholder="search"  style={styles.input} />
      <ScrollView>
        {todoList.map((todo, i) => (
          <View key={i} style={styles.todoContainer}>
            <Text key={i} style={{...styles.todoText, backgroundColor:todo.completed? "green":""}}>
            {todo.title}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={(e) => handleEdite(e, todo)}>
                <Ionicons name="pencil-outline" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={(e) => handleDelete(e, todo)}>
                <Ionicons name="trash-outline" size={30} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={(e) => handleComplete(e, todo)}>
                <Ionicons name="checkbox" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  error:{
    color: "#fff",
    backgroundColor:"#F0F0FO",
    Text: "#3333333",
    width: 400,
    padding:10,
  },
  loading: {
    color: "#fff",
    backgroundColor:"#F0F0FO",
    Text: "#3333333",
    width: 400,
    padding:10,
  },
  addTodo: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "gothic, sans-serif",
  },
  input: {
    color: "#111",
    backgroundColor: "#F0F0F0",
    Text: "#111",
    width: 400,
    padding: 10,
    margin: 25,
  },

  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes text and buttons to opposite sides
    alignItems: 'center',
    backgroundColor: "#F0F0F0",
    width: 400,
    padding: 10,
    margin: 25,
    borderRadius: 8,
  },
  
  todoText: {
    color: "#000",
    Text: "#3333333",
    width: '60%', // Ensure the text takes up most space
    fontSize: 16,
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns buttons to the right
    alignItems: 'center',
  },

  // Individual button styles (optional, you can adjust the spacing)
  iconButton: {
    marginLeft: 10,
  }
});
