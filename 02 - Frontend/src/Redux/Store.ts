import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./AuthState";
import { tasksReducer } from "./TasksState";


// Creating reducers object from all our reducers: 
const reducers = combineReducers({ authState: authReducer, tasksState: tasksReducer });

// The most important Redux object: 

// const store = createStore(reducers); // Without Redux-DevTools

const store = createStore(reducers, composeWithDevTools()); // With Redux-DevTools

export default store;
