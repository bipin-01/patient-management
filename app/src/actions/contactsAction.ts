import axios from "axios";
import {
  CONTACTS_LIST_SUCCESS,
  CONTACTS_LIST_REQUEST,
  CONTACTS_LIST_FAIL,
  CONTACTS_CREATE_REQUEST,
  CONTACTS_CREATE_SUCCESS,
  CONTACTS_CREATE_FAIL,
  CONTACTS_DELETE_SUCCESS,
  CONTACTS_DELETE_FAIL,
  CONTACTS_DELETE_REQUEST,
  CONTACTS_UPDATE_REQUEST,
  CONTACTS_UPDATE_SUCCESS,
  CONTACTS_UPDATE_FAIL,
} from "../constants/contactsConstants";

export const listNotes: any = () => async(dispatch: any, getState: any) => {
    try {
        dispatch({
            type: CONTACTS_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${
          userInfo.authData
            ? userInfo.authData.data.token
            : userInfo.data.token
        }`,
      },
    };
    
    const { data } = await axios.get(`/api/mypatients`, config);

    dispatch({
        type: CONTACTS_LIST_SUCCESS,
        payload: data,
    })
} catch(error: any) {

    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
        type: CONTACTS_LIST_FAIL,
        payload: message,
    });
}
}

export const createContactAction: any = (name: any, email: any, number: any, pic: any, dateOfBirth: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: CONTACTS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          userInfo.authData
            ? userInfo.authData.data.token
            : userInfo.data.token
        }`,
      },
    };

    const { data } = await axios.post(`/api/mypatients/create`, 
    {name, email, number, pic, dateOfBirth},
    config);

    dispatch({
      type: CONTACTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteContactAction: any = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: CONTACTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${
          userInfo.authData
            ? userInfo.authData.data.token
            : userInfo.data.token
        }`,
      },
    };

    const { data } = await axios.delete(`/api/mypatients/${id}`, config);

    dispatch({
      type: CONTACTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateContactAction: any =
  (id: any, name: any, email: any, number: any, pic: any, dateOfBirth: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: CONTACTS_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            userInfo.authData
              ? userInfo.authData.data.token
              : userInfo.data.token
          }`,
        },
      };


      const { data } = await axios.put(
        `/api/mypatients/${id}`,
        { name, email, number, pic, dateOfBirth },
        config
      );
      dispatch({
        type: CONTACTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CONTACTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

