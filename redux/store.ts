import { createStore } from "redux";
import MyReducer from "./reducers";

const Store = createStore(MyReducer)
export default Store