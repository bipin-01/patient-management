import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { contactCreateReducer, contactListReducer, contactsDeleteReducer, contactsUpdateReducer } from './reducers/contactsReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  contactsList: contactListReducer,
  contactsCreate: contactCreateReducer,
  contactsUpdate: contactsUpdateReducer,
  contactsDelete: contactsDeleteReducer,
});

const userInfoFromStorage: any = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;
const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
