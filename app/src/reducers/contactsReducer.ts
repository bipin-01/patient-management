
import {
  CONTACTS_LIST_REQUEST,
  CONTACTS_LIST_FAIL,
  CONTACTS_LIST_SUCCESS,
  CONTACTS_CREATE_REQUEST,
  CONTACTS_CREATE_SUCCESS,
  CONTACTS_CREATE_FAIL,
  CONTACTS_DELETE_REQUEST,
  CONTACTS_DELETE_FAIL,
  CONTACTS_DELETE_SUCCESS,
  CONTACTS_UPDATE_FAIL,
  CONTACTS_UPDATE_REQUEST,
  CONTACTS_UPDATE_SUCCESS,
} from "../constants/contactsConstants";


export const contactListReducer = (state = { contacts: []}, action: any) => {

    switch (action.type) {
      case CONTACTS_LIST_REQUEST:
        return { loading: true };
      case CONTACTS_LIST_SUCCESS:
        return { loading: false, contacts: action.payload};
      case CONTACTS_LIST_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
}

export const contactCreateReducer = (state = {}, action: any) => {

  switch(action.type) {
    case CONTACTS_CREATE_REQUEST: 
      return { loading: true};
    case CONTACTS_CREATE_SUCCESS:
        return { loading: false, success: true};
    case CONTACTS_CREATE_FAIL:
        return { loading: false, error: action.payload}

    default: 
      return state;
  }

}

export const contactsUpdateReducer = (state = {}, action: any) => {
  switch(action.type) {
    case CONTACTS_UPDATE_REQUEST:
      return { loading: true}
    case CONTACTS_UPDATE_SUCCESS:
      return { loading: false, success: true}
    case CONTACTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false}
    
      default: 
        return state
  }
}

export const contactsDeleteReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CONTACTS_DELETE_REQUEST:
      return { loading: true };
    case CONTACTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACTS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};