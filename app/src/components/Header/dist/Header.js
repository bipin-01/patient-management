"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_redux_1 = require("react-redux");
var react_redux_2 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var userAction_1 = require("../../actions/userAction");
function Header(_a) {
    var setSearch = _a.setSearch;
    var history = react_router_dom_1.useNavigate();
    var dispatch = react_redux_2.useDispatch();
    var userLogin = react_redux_1.useSelector(function (state) { return state.userLogin; });
    var userInfo = userLogin.userInfo;
    var logoutHandler = function () {
        dispatch(userAction_1.logout());
        history("/");
    };
    return (react_1["default"].createElement(react_bootstrap_1.Navbar, { collapseOnSelect: true, expand: 'lg', bg: 'primary', variant: 'dark' },
        react_1["default"].createElement(react_bootstrap_1.Container, null,
            react_1["default"].createElement(react_bootstrap_1.Navbar.Brand, null,
                react_1["default"].createElement(react_router_dom_1.Link, { to: '/' }, "Patient Management")),
            react_1["default"].createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": 'responsive-navbar-nav' }),
            react_1["default"].createElement(react_bootstrap_1.Navbar.Collapse, { id: 'responsive-navbar-nav' },
                react_1["default"].createElement(react_bootstrap_1.Nav, { className: 'm-auto' },
                    react_1["default"].createElement(react_bootstrap_1.Form, { inline: true },
                        react_1["default"].createElement(react_bootstrap_1.FormControl, { type: 'text', placeholder: 'Search', className: 'mr-sm-2', onChange: function (e) { return setSearch(e.target.value); } }))),
                userInfo ? (react_1["default"].createElement(react_bootstrap_1.Nav, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: '/mypatients' },
                            react_1["default"].createElement(react_router_dom_1.Link, { to: '/mypatients' }, "My Patients")),
                        userInfo.data ? react_1["default"].createElement(react_bootstrap_1.NavDropdown, { title: userInfo.data.name, id: 'collasible-nav-dropdown' },
                            react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: '/profile' }, "My Profile"),
                            react_1["default"].createElement(react_bootstrap_1.NavDropdown.Divider, null),
                            react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { onClick: logoutHandler }, "Logout")) :
                            react_1["default"].createElement(react_bootstrap_1.NavDropdown, { title: userInfo.name, id: 'collasible-nav-dropdown' },
                                react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: '/profile' }, "My Profile"),
                                react_1["default"].createElement(react_bootstrap_1.NavDropdown.Divider, null),
                                react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { onClick: logoutHandler }, "Logout"))))) : (react_1["default"].createElement(react_bootstrap_1.Nav, null,
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: '/login' },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: '/login' }, "Login"))))))));
}
exports["default"] = Header;
