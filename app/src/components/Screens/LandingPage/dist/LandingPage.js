"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
require("./LandingPage.css");
function LandingPage() {
    var history = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        var userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            history("/mypatients");
        }
    }, [history]);
    return (react_1["default"].createElement("div", { className: 'main' },
        react_1["default"].createElement(react_bootstrap_1.Container, null,
            react_1["default"].createElement(react_bootstrap_1.Row, null,
                react_1["default"].createElement("div", { className: 'intro-text' },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h1", { className: 'title' }, "Welcome to Patient Manager"),
                        react_1["default"].createElement("p", { className: 'subtitle' }, "One Safe place for all your Patient Information")),
                    react_1["default"].createElement("div", { className: 'buttonContainer' },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: '/login' },
                            react_1["default"].createElement(react_bootstrap_1.Button, { size: 'lg', className: 'landingbutton' }, "Login")),
                        react_1["default"].createElement(react_router_dom_1.Link, { to: '/register' },
                            react_1["default"].createElement(react_bootstrap_1.Button, { variant: 'outline-primary', size: 'lg', className: 'landingbutton' }, "Signup"))))))));
}
exports["default"] = LandingPage;
