import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";


const MyReducer = combineReducers({
    user: userAuthReducer
})

export default MyReducer