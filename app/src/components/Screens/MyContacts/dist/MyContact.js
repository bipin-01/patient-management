"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
require("./MyContacts.css");
var MainScreen_1 = require("../../MainScreen");
var react_redux_1 = require("react-redux");
var react_redux_2 = require("react-redux");
var contactsAction_1 = require("../../../actions/contactsAction");
var Loading_1 = require("../../Loading");
var ErrorMessage_1 = require("../../ErrorMessage");
function MyContacts(_a) {
    var search = _a.search;
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useNavigate();
    var userLogin = react_redux_2.useSelector(function (state) { return state.userLogin; });
    var userInfo = userLogin.userInfo;
    var contactList = react_redux_2.useSelector(function (state) { return state.contactsList; });
    var contacts = contactList.contacts, error = contactList.error;
    var list = contacts;
    list === null || list === void 0 ? void 0 : list.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB)
            //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });
    var contactCreate = react_redux_2.useSelector(function (state) { return state.contactsCreate; });
    var successCreate = contactCreate.success;
    var contactUpdate = react_redux_2.useSelector(function (state) { return state.contactsUpdate; });
    var successUpdate = contactUpdate.success;
    var contactDelete = react_redux_2.useSelector(function (state) { return state.contactsDelete; });
    var loadingDelete = contactDelete.loading, errorDelete = contactDelete.error, successDelete = contactDelete.success;
    var deleteHandler = function (id) {
        if (window.confirm("Are You SUre?")) {
            dispatch(contactsAction_1.deleteContactAction(id));
        }
    };
    react_1.useEffect(function () {
        if (!userInfo) {
            history("/");
        }
        dispatch(contactsAction_1.listNotes());
        if (!userInfo) {
            history("/");
        }
    }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        successUpdate,
        successDelete,
    ]);
    return (react_1["default"].createElement(MainScreen_1["default"], { title: "Welcome Back " + (userInfo.authData ? userInfo.authData.data.name : userInfo.data.name) },
        react_1["default"].createElement(react_router_dom_1.Link, { to: '/createcontact' },
            react_1["default"].createElement(react_bootstrap_1.Button, { style: { marginLeft: 10, marginBottom: 6 }, size: 'lg' }, "Add Patient")),
        errorDelete && react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, error),
        loadingDelete && react_1["default"].createElement(Loading_1["default"], null), list === null || list === void 0 ? void 0 :
        list.filter(function (filteredContact) {
            return filteredContact.name.toLowerCase().includes(search);
        }).map(function (info) { return (react_1["default"].createElement(react_bootstrap_1.Accordion, { key: info._id },
            react_1["default"].createElement(react_bootstrap_1.Card, { style: { margin: 10 }, key: info._id },
                react_1["default"].createElement(react_bootstrap_1.Card.Header, { style: { display: "flex" } },
                    react_1["default"].createElement("span", { style: {
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18
                        } },
                        react_1["default"].createElement(react_bootstrap_1.Accordion.Toggle, { as: react_bootstrap_1.Card.Text, className: 'pic', variant: 'link', eventKey: '0' },
                            react_1["default"].createElement("img", { src: info.pic, alt: info.name }),
                            info.name)),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(react_bootstrap_1.Button, { href: "/mypatients/" + info._id }, "Edit"),
                        react_1["default"].createElement(react_bootstrap_1.Button, { variant: 'danger', className: 'mx-2', onClick: function () { return deleteHandler(info._id); } }, "Delete"))),
                react_1["default"].createElement(react_bootstrap_1.Accordion.Collapse, { eventKey: '0' },
                    react_1["default"].createElement(react_bootstrap_1.Card.Body, null,
                        react_1["default"].createElement("h4", null,
                            react_1["default"].createElement(react_bootstrap_1.Badge, { variant: 'success' },
                                "Phone No: - ",
                                info.number)),
                        react_1["default"].createElement("blockquote", { className: 'blockquote mb-0' },
                            react_1["default"].createElement("p", null,
                                "Email - ",
                                info.email),
                            react_1["default"].createElement("p", null,
                                "DOB - ",
                                info.dateOfBirth.substr(0, 10)),
                            "Created On",
                            " ",
                            react_1["default"].createElement("cite", { title: 'Source Title' }, info.createdAt.substring(0, 10)))))))); })));
}
exports["default"] = MyContacts;
