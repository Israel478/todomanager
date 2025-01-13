import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todoList: Array.from({ length: 20 }, (_, i) => "todo" + i.toString()),
    loading:false,
    error: undefined
}


const todoSlice = createSlice({
    name: "todoList",
    initialState: initialState,
    reducers:{
        todoSuccess: (state, action) =>{
            return {...state, todoList:action.payload};
        },
        todoReset: (state, action)=>{
            return {...initialState}
        }
    }
});

export const {todoSuccess, todoReset} = todoSlice.actions;

export default todoSlice.reducer;