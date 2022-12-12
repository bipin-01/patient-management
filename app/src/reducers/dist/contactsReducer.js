"use strict";
exports.__esModule = true;
exports.contactsDeleteReducer = exports.contactsUpdateReducer = exports.contactCreateReducer = exports.contactListReducer = void 0;
var contactsConstants_1 = require("../constants/contactsConstants");
exports.contactListReducer = function (state, action) {
    if (state === void 0) { state = { contacts: [] }; }
    switch (action.type) {
        case contactsConstants_1.CONTACTS_LIST_REQUEST:
            return { loading: true };
        case contactsConstants_1.CONTACTS_LIST_SUCCESS:
            return { loading: false, contacts: action.payload };
        case contactsConstants_1.CONTACTS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.contactCreateReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case contactsConstants_1.CONTACTS_CREATE_REQUEST:
            return { loading: true };
        case contactsConstants_1.CONTACTS_CREATE_SUCCESS:
            return { loading: false, success: true };
        case contactsConstants_1.CONTACTS_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.contactsUpdateReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case contactsConstants_1.CONTACTS_UPDATE_REQUEST:
            return { loading: true };
        case contactsConstants_1.CONTACTS_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case contactsConstants_1.CONTACTS_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
exports.contactsDeleteReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case contactsConstants_1.CONTACTS_DELETE_REQUEST:
            return { loading: true };
        case contactsConstants_1.CONTACTS_DELETE_SUCCESS:
            return { loading: false, success: true };
        case contactsConstants_1.CONTACTS_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
