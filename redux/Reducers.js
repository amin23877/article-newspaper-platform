import { combineReducers } from "redux";
import users from "./users";
import manageAccount from "./manage-account";

export default combineReducers({
  users,
  manageAccount,
});
