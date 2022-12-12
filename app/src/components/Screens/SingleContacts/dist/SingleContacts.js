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
var MainScreen_1 = require("../../MainScreen");
var axios_1 = require("axios");
var react_bootstrap_1 = require("react-bootstrap");
var react_redux_1 = require("react-redux");
var contactsAction_1 = require("../../../actions/contactsAction");
var ErrorMessage_1 = require("../../ErrorMessage");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = require("../../Loading");
var react_router_dom_2 = require("react-router-dom");
function SingleNote(match) {
    var _this = this;
    var id = react_router_dom_2.useParams().id;
    console.log(id, "this is id");
    var history = react_router_dom_1.useNavigate();
    var _a = react_1.useState(""), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(""), content = _b[0], setContent = _b[1];
    var _c = react_1.useState(""), category = _c[0], setCategory = _c[1];
    var _d = react_1.useState(""), date = _d[0], setDate = _d[1];
    var dispatch = react_redux_1.useDispatch();
    var contactUpdate = react_redux_1.useSelector(function (state) { return state.contactsUpdate; });
    var loading = contactUpdate.loading, error = contactUpdate.error;
    var contactDelete = react_redux_1.useSelector(function (state) { return state.contactsDelete; });
    var loadingDelete = contactDelete.loading, errorDelete = contactDelete.error;
    var deleteHandler = function (id) {
        if (window.confirm("Are you sure?")) {
            dispatch(contactsAction_1.deleteContactAction(id));
        }
        history("/mypatients");
    };
    react_1.useEffect(function () {
        var fetching = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get("/api/mypatients/" + id)];
                    case 1:
                        data = (_a.sent()).data;
                        setTitle(data.title);
                        setContent(data.content);
                        setCategory(data.category);
                        setDate(data.updatedAt);
                        return [2 /*return*/];
                }
            });
        }); };
        fetching();
    }, [id, date]);
    var resetHandler = function () {
        setTitle("");
        setCategory("");
        setContent("");
    };
    var updateHandler = function (e) {
        e.preventDefault();
        dispatch(contactsAction_1.updateContactAction(id, title, content, category));
        if (!title || !content || !category)
            return;
        resetHandler();
        history("/mypatients");
    };
    return (react_1["default"].createElement(MainScreen_1["default"], { title: 'Edit Note' },
        react_1["default"].createElement(react_bootstrap_1.Card, null,
            react_1["default"].createElement(react_bootstrap_1.Card.Header, null, "Edit your Note"),
            react_1["default"].createElement(react_bootstrap_1.Card.Body, null,
                react_1["default"].createElement(react_bootstrap_1.Form, { onSubmit: updateHandler },
                    loadingDelete && react_1["default"].createElement(Loading_1["default"], null),
                    error && react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, error),
                    errorDelete && (react_1["default"].createElement(ErrorMessage_1["default"], { variant: 'danger' }, errorDelete)),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'title' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Title"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'title', placeholder: 'Enter the title', value: title, onChange: function (e) { return setTitle(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'content' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Content"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { placeholder: 'Enter the content', value: content, onChange: function (e) { return setContent(e.target.value); } })),
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: 'category' },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Category"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: 'content', placeholder: 'Enter the Category', value: category, onChange: function (e) { return setCategory(e.target.value); } })),
                    loading && react_1["default"].createElement(Loading_1["default"], { size: 50 }),
                    react_1["default"].createElement(react_bootstrap_1.Button, { variant: 'primary', type: 'submit' }, "Update Note"),
                    react_1["default"].createElement(react_bootstrap_1.Button, { className: 'mx-2', variant: 'danger', onClick: function () { return deleteHandler(id); } }, "Delete Note"))),
            react_1["default"].createElement(react_bootstrap_1.Card.Footer, { className: 'text-muted' },
                "Updated on - ",
                date.substring(0, 10)))));
}
exports["default"] = SingleNote;
