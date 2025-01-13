import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./features/TodoList/reducers"


const store = configureStore({
reducer:{
    todoList: todoListReducer
}
});


export default store;