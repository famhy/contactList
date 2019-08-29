import { createStore,combineReducers} from "redux";
import {contactReducer,contactListReducer} from './reducer'

// addItem=()=>{
//     store.dispatch(addTodo(todo.trim()))
//     console.log(todo)
//     console.log(store.getState()[0].text)
// }
const store = createStore(combineReducers({contactReducer,contactListReducer}));

export default store


