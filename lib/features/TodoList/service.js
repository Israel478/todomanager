import store from "../../store";
import { todoSuccess, loading, error } from "./reducers";
import axios from "axios";
export async function getTodos(){
    store.dispatch(loading(true)); // dispatching loading action before request
    const response= await axios.get(
        "https://jsonplaceholder.typicode.com/todos");
            if(response.status ===200){
                store.dispatch(todoSuccess(response.data));
            }
            else{
               store.dispatch(error("error"+ response.status + " " + response.statusText))
            }
            store.dispatch(loading(false)); // dispatching loading action after request
};

