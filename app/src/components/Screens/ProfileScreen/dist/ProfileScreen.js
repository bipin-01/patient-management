"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var MainScreen_1 = require("../../MainScreen");
require("./ProfileScreen.css");
var react_redux_1 = require("react-redux");
var userAction_1 = require("../../../actions/userAction");
var Loading_1 = require("../../Loading");
var ErrorMessage_1 = require("../../ErrorMessage");
var react_router_dom_1 = require("react-router-dom");
var ProfileScreen = function () {
    var _a = react_1.useState(""), name = _a[0], setName = _a[1];
    var _b = react_1.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(), pic = _c[0], setPic = _c[1];
    var _d = react_1.useState(""), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(""), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_1.useState(''), picMessage = _f[0], setPicMessage = _f[1];
    var history = react_router_dom_1.useNavigate();
    var dispatch = react_redux_1.useDispatch();
    var userLogin = react_redux_1.useSelector(function (state) { return state.userLogin; });
    var userInfo = userLogin.userInfo;
    var userUpdate = react_redux_1.useSelector(function (state) { return state.userUpdate; });
    var loading = userUpdate.loading, error = userUpdate.error, success = userUpdate.success;
    react_1.useEffect(function () {
        if (!userInfo) {
            history("/");
        }
        else {
            var name_1 = userInfo.authData ? userInfo.authData.data.name : userInfo.name;
            var email_1 = userInfo.authData
                ? userInfo.authData.data.email
                : userInfo.email;
            var pic_1 = userInfo.authData
                ? userInfo.authData.data.pic
                : userInfo.pic;
            setName(name_1);
            setEmail(email_1);
            setPic(pic_1);
        }
    }, [history, userInfo]);
    var postDetails = function (pics) {
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
    };
    var submitHandler = function (e) {
        e.preventDefault();
        dispatch(userAction_1.updateProfile({ name: name, email: email, password: password, pic: pic }));
    };
    return (react_1["default"].createElement(MainScreen_1["default"], { title: 'EDIT PROFILE' },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_bootstrap_1.Row, { className: 'profileContainer' },
                react_1["default"].createElement(react_bootstrap_1.Col, { md: 6 },
                    react_1["default"].createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                        loading && react_1["default"].createElement(Loading_1["default"], null),
                        success && (react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'success' }, "Updated Successfully")),
                        error && react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, error),
                        react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'name' },
                            react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Name"),
                            react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'text', placeholder: 'Enter Name', value: name, onChange: function (e) { return setName(e.target.value); } })),
                        react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'email' },
                            react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Email Address"),
                            react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'email', placeholder: 'Enter Email', value: email, onChange: function (e) { return setEmail(e.target.value); } })),
                        react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'password' },
                            react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Password"),
                            react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'password', placeholder: 'Enter Password', value: password, onChange: function (e) { return setPassword(e.target.value); } })),
                        react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'confirmPassword' },
                            react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Confirm Password"),
                            react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'password', placeholder: 'Confirm Password', value: confirmPassword, onChange: function (e) { return setConfirmPassword(e.target.value); } })),
                        " ",
                        picMessage && (react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, picMessage)),
                        react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'pic' },
                            react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Change Profile Picture"),
                            react_1["default"].createElement(react_bootstrap_1.Form.File, { onChange: function (e) { return postDetails(e.target.files[0]); }, id: 'custom-file', type: 'image/png', label: 'Upload Profile Picture', custom: true })),
                        react_1["default"].createElement(react_bootstrap_1.Button, { type: 'submit' }, "Update"))),
                react_1["default"].createElement(react_bootstrap_1.Col, { style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    } },
                    react_1["default"].createElement("img", { src: pic, alt: name, className: 'profilePic' }))))));
};
exports["default"] = ProfileScreen;
