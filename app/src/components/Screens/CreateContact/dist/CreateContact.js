"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MainScreen_1 = require("../../MainScreen");
var react_bootstrap_1 = require("react-bootstrap");
var react_redux_1 = require("react-redux");
var contactsAction_1 = require("../../../actions/contactsAction");
var Loading_1 = require("../../Loading");
var ErrorMessage_1 = require("../../ErrorMessage");
var react_router_dom_1 = require("react-router-dom");
function CreateNote() {
    var _a = react_1.useState(""), name = _a[0], setName = _a[1];
    var _b = react_1.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(""), number = _c[0], setNumber = _c[1];
    var _d = react_1.useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"), pic = _d[0], setPic = _d[1];
    var _e = react_1.useState(new Date()), dateOfBirth = _e[0], setDateOfBirth = _e[1];
    var history = react_router_dom_1.useNavigate();
    var dispatch = react_redux_1.useDispatch();
    var contactCreate = react_redux_1.useSelector(function (state) { return state.contactsCreate; });
    var loading = contactCreate.loading, error = contactCreate.error, contact = contactCreate.contact;
    var _f = react_1.useState(""), picMessage = _f[0], setPicMessage = _f[1];
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
        else {
            return setPic("Please Selct an image");
        }
    };
    var resetHandler = function () {
        setName("");
        setNumber("");
        setEmail("");
        setPic("");
        setDateOfBirth("");
    };
    var cancelHandler = function (e) {
        history("/mypatients");
    };
    var submitHandler = function (e) {
        e.preventDefault();
        dispatch(contactsAction_1.createContactAction(name, email, number, pic, dateOfBirth));
        if (!name || !email || !number)
            return;
        resetHandler();
        history("/mypatients");
    };
    react_1.useEffect(function () { }, []);
    return (react_1["default"].createElement(MainScreen_1["default"], { title: 'Create a Contact' },
        react_1["default"].createElement(react_bootstrap_1.Card, null,
            react_1["default"].createElement(react_bootstrap_1.Card.Header, null, "Create a new Contact"),
            react_1["default"].createElement(react_bootstrap_1.Card.Body, null,
                react_1["default"].createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                    error && react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, error),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'name' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'name', value: name, placeholder: 'Enter the name', onChange: function (e) { return setName(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'content' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Email"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'email', value: email, placeholder: 'Enter the email', onChange: function (e) { return setEmail(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'number' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Number"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'number', value: number, placeholder: 'Enter Phone Number', onChange: function (e) { return setNumber(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'birth' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Date of Birth"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'date', name: 'datepic', placeholder: 'DateRange', value: dateOfBirth, onChange: function (e) { return setDateOfBirth(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'pic' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Profile Picture"),
                        react_1["default"].createElement(react_bootstrap_1.Form.File, { onChange: function (e) {
                                postDetails(e.target.files[0]);
                            }, id: 'custom-file', type: 'image/png', label: 'Upload Profile Picture', custom: true })),
                    loading && react_1["default"].createElement(Loading_1["default"], { size: 50 }),
                    react_1["default"].createElement(react_bootstrap_1.Button, { type: 'submit', variant: 'primary' }, "Create Contact"),
                    react_1["default"].createElement(react_bootstrap_1.Button, { className: 'mx-2', onClick: resetHandler, variant: 'danger' }, "Reset Feilds"),
                    react_1["default"].createElement(react_bootstrap_1.Button, { variant: 'primary', onClick: cancelHandler, className: 'mx-2' }, "Cancel"))),
            react_1["default"].createElement(react_bootstrap_1.Card.Footer, { className: 'text-muted' },
                "Creating on - ",
                new Date().toLocaleDateString()))));
}
exports["default"] = CreateNote;
