import { combineReducers } from "redux";
import userReducer from "./users";
import authReducer from "./authSlice";
import depositReducer from "./deposits";
import withdrawReducer from "./withdraws";

export default combineReducers({
  users: userReducer,
  auth: authReducer,
  deposits: depositReducer,
  withdraws: withdrawReducer,
});
