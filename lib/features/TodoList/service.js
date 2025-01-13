import store from "../../store";
import { todoSuccess } from "./reducers";
import axios from "axios";
export async function getTodos(){
    const response= await axios.get(
        "https://jsonplaceholder.typicode.com/todos");
            if(response.status ===200){
                store.dispatch(todoSuccess(response.data));
            }
            else{
               console.error("internal servererror")
            }
};

