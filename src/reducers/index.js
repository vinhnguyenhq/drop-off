import { combineReducers } from "redux";
import counterReducer from "./counter";
import { onlineReducer } from "redux-online-store-enhancer";

const rootReducer = combineReducers({
  count: counterReducer,
  online: onlineReducer
});

export default rootReducer;
