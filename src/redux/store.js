import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({ userReducer: userReducer });
export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
