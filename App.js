import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import TodoForm from './components/TodoForm';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from "./lib/store"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="todoList">
          <Stack.Screen name="todoList" component={TodoList} />
          <Stack.Screen name="todoForm" component={TodoForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

}


