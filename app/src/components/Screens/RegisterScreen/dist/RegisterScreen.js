"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
require("./RegisterScreen.css");
var MainScreen_1 = require("../../MainScreen");
var ErrorMessage_1 = require("../../ErrorMessage");
var Loading_1 = require("../../Loading");
var userAction_1 = require("../../../actions/userAction");
function RegisterScreen() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), name = _b[0], setName = _b[1];
    var _c = react_1.useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"), pic = _c[0], setPic = _c[1];
    var history = react_router_dom_1.useNavigate();
    var dispatch = react_redux_1.useDispatch();
    var _d = react_1.useState(""), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(""), confirmpassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_1.useState(""), message = _f[0], setMessage = _f[1];
    var _g = react_1.useState(""), picMessage = _g[0], setPicMessage = _g[1];
    var userRegister = react_redux_1.useSelector(function (state) { return state.userRegister; });
    var loading = userRegister.loading, error = userRegister.error, userInfo = userRegister.userInfo;
    react_1.useEffect(function () {
        if (userInfo) {
            history("/mypatients");
        }
    }, [history, userInfo]);
    var submitHandler = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            if (password !== confirmpassword) {
                setMessage("Password do not match");
            }
            else {
                dispatch(userAction_1.register(name, email, password, pic));
            }
            return [2 /*return*/];
        });
    }); };
    var postDetails = function (pics) {
        var cloud_name = "dxlepos58";
        if (!pics) {
            return setPicMessage("Please Select an Image");
        }
        setPicMessage("");
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            var data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "patientmanagement");
            data.append("cloud_name", "dxlepos58");
            fetch("https://api.cloudinary.com/v1_1/dxlepos58/image/upload", {
                method: "POST",
                body: data
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                setPic(data.url.toString());
            })["catch"](function (err) {
                console.log(err);
            });
        }
        else {
            return setPic("Please Selct an image");
        }
    };
    return (react_1["default"].createElement(MainScreen_1["default"], { title: 'REGISTER' },
        react_1["default"].createElement("div", { className: 'loginContainer' },
            error && react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, error),
            message && react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, message),
            loading && react_1["default"].createElement(Loading_1["default"], null),
            react_1["default"].createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'name' },
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Name"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'name', value: name, placeholder: 'Enter name', onChange: function (e) { return setName(e.target.value); } })),
                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'formBasicEmail' },
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Email address"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'email', value: email, placeholder: 'Enter email', onChange: function (e) { return setEmail(e.target.value); } })),
                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'formBasicPassword' },
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Password"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'password', value: password, placeholder: 'Password', onChange: function (e) { return setPassword(e.target.value); } })),
                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'confirmPassword' },
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Confirm Password"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'password', value: confirmpassword, placeholder: 'Confirm Password', onChange: function (e) { return setConfirmPassword(e.target.value); } })),
                picMessage && (react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, picMessage)),
                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'pic' },
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Profile Picture"),
                    react_1["default"].createElement(react_bootstrap_1.Form.File, { onChange: function (e) { return postDetails(e.target.files[0]); }, id: 'custom-file', type: 'image/png', label: 'Upload Profile Picture', custom: true })),
                react_1["default"].createElement(react_bootstrap_1.Button, { variant: 'primary', type: 'submit' }, "Register")),
            react_1["default"].createElement(react_bootstrap_1.Row, { className: 'py-3' },
                react_1["default"].createElement(react_bootstrap_1.Col, null,
                    "Have an Account ? ",
                    react_1["default"].createElement(react_router_dom_1.Link, { to: '/login' }, "Login"))))));
}
exports["default"] = RegisterScreen;
