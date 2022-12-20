"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Header_1 = require("./components/Header/Header");
var Footer_1 = require("./components/Footer/Footer");
var LandingPage_1 = require("./components/Screens/LandingPage/LandingPage");
var react_router_dom_1 = require("react-router-dom");
var MyContact_1 = require("./components/Screens/MyContacts/MyContact");
var LoginScreen_1 = require("./components/Screens/LoginScreen/LoginScreen");
var RegisterScreen_1 = require("./components/Screens/RegisterScreen/RegisterScreen");
var CreateContact_1 = require("./components/Screens/CreateContact/CreateContact");
var SingleContacts_1 = require("./components/Screens/SingleContacts/SingleContacts");
var ProfileScreen_1 = require("./components/Screens/ProfileScreen/ProfileScreen");
function App() {
    var _a = react_1.useState(''), search = _a[0], setSearch = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(Header_1["default"], { setSearch: setSearch }),
            react_1["default"].createElement("main", { style: { minHeight: "88vh" } },
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/', element: react_1["default"].createElement(LandingPage_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/login', element: react_1["default"].createElement(LoginScreen_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/profile', element: react_1["default"].createElement(ProfileScreen_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/register', element: react_1["default"].createElement(RegisterScreen_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/createcontact', element: react_1["default"].createElement(CreateContact_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/mypatients/:id', element: react_1["default"].createElement(SingleContacts_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/mypatients', element: react_1["default"].createElement(MyContact_1["default"], { search: search }) }))),
            react_1["default"].createElement(Footer_1["default"], null))));
}
exports["default"] = App;
