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
    var _a = react_1.useState(""), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(""), content = _b[0], setContent = _b[1];
    var _c = react_1.useState(""), category = _c[0], setCategory = _c[1];
    var history = react_router_dom_1.useNavigate();
    var dispatch = react_redux_1.useDispatch();
    var contactCreate = react_redux_1.useSelector(function (state) { return state.contactsCreate; });
    var loading = contactCreate.loading, error = contactCreate.error, contact = contactCreate.contact;
    var resetHandler = function () {
        setTitle("");
        setCategory("");
        setContent("");
    };
    var submitHandler = function (e) {
        e.preventDefault();
        dispatch(contactsAction_1.createContactAction(title, content, category));
        if (!title || !content || !category)
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
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'title' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Title"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'title', value: title, placeholder: 'Enter the title', onChange: function (e) { return setTitle(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'content' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Content"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'content', value: content, placeholder: 'Enter the content', onChange: function (e) { return setContent(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'content' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Category"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'content', value: category, placeholder: 'Enter the Category', onChange: function (e) { return setCategory(e.target.value); } })),
                    loading && react_1["default"].createElement(Loading_1["default"], { size: 50 }),
                    react_1["default"].createElement(react_bootstrap_1.Button, { type: 'submit', variant: 'primary' }, "Create Note"),
                    react_1["default"].createElement(react_bootstrap_1.Button, { className: 'mx-2', onClick: resetHandler, variant: 'danger' }, "Reset Feilds"))),
            react_1["default"].createElement(react_bootstrap_1.Card.Footer, { className: 'text-muted' },
                "Creating on - ",
                new Date().toLocaleDateString()))));
}
exports["default"] = CreateNote;
