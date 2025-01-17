import axios from "axios";
import { todoSuccess, error, isLoading } from "./reducers";
import store from "../../store";


export async function getTodos() {
    store.dispatch(isLoading(true));
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos"); 
    if(response.status === 200){
       //handle success scenario
       store.dispatch(todoSuccess(response.data))
    }
    else{
        //handle error scenario
        store.dispatch(error("error: "+ response.status + " " +  response.statusText)) 
    }
    store.dispatch(isLoading(false));

}


export async function addTodo( todo ) {

store.dispatch(isLoading(true));
const response = await axios.post("https://jsonplaceholder.typicode.com/todos", todo);
if(response.status === 201){
    //handle success scenario
    //get the previously created todos then add the new on on top
    const previousTodos = store.getState().todoList.todoList;
    store.dispatch(todoSuccess([response.data, ...previousTodos]))
}   
else{
    //handle error scenario
    store.dispatch(error("error: "+ response.status + " " +  response.statusText)) 
}
store.dispatch(isLoading(false));
}

export async function updateTodoStatus( payload ) {
    const {id, completed} = payload;
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed});
    if(response.status === 200){
        //handle success scenario
        const previousTodos = store.getState().todoList.todoList;
        const updatedTodos = previousTodos.map(todo => {
            if(todo.id === id){
                return {...todo, completed}
            }
            return todo;
        });
        store.dispatch(todoSuccess(updatedTodos))
    }   
    else{
        //handle error scenario
        store.dispatch(error("error: "+ response.status + " " +  response.statusText)) 
    }   
}

export async function deleteTodo(payload){
    const {id} = payload;
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if(response.status === 200){
        //handle success scenario
        const previousTodos = store.getState().todoList.todoList;
        const updatedTodos = previousTodos.filter(todo => todo.id !== id);
        store.dispatch(todoSuccess(updatedTodos));
    }
    else {
        //handle error scenario
        store.dispatch(error("error: "+ response.status + " " +  response.statusText))
    }
}