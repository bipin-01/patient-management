"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = require("redux-thunk");
var userReducers_1 = require("./reducers/userReducers");
var contactsReducer_1 = require("./reducers/contactsReducer");
var reducer = redux_1.combineReducers({
    userLogin: userReducers_1.userLoginReducer,
    userRegister: userReducers_1.userRegisterReducer,
    contactsList: contactsReducer_1.contactListReducer,
    contactsCreate: contactsReducer_1.contactCreateReducer,
    contactsUpdate: contactsReducer_1.contactsUpdateReducer,
    contactsDelete: contactsReducer_1.contactsDeleteReducer
});
var userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
var initialState = { userLogin: { userInfo: userInfoFromStorage } };
var middleware = [redux_thunk_1["default"]];
var store = redux_1.createStore(reducer, initialState, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware.apply(void 0, middleware)));
exports["default"] = store;
