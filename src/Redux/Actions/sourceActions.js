import {
  CREATE_SOURCE_REQUEST,
  CREATE_SOURCE_SUCCESS,
  CREATE_SOURCE_FAIL,
  GET_SOURCES_REQUEST,
  GET_SOURCES_FAIL,
  GET_SOURCES_SUCCESS,
  DELETE_SOURCE_REQUEST,
  DELETE_SOURCE_SUCCESS,
  DELETE_SOURCE_FAIL,
} from "../Constants/sourceConstants";
import axios from "axios";
import { URL } from "../../Url.js";
import { logout } from "./userActions.js";

//CREATE SOURCE
export const createSource = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_SOURCE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${URL}/api/source/`, { name }, config);

    dispatch({ type: CREATE_SOURCE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: CREATE_SOURCE_FAIL, payload: message });
  }
};

//ADMIN GET SOURCES
export const listSources = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SOURCES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/source/all`, config);

    dispatch({ type: GET_SOURCES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: GET_SOURCES_FAIL, payload: message });
  }
};

//ADMIN DELETE SOURCE
export const deleteSource = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_SOURCE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/source/${id}`, config);

    dispatch({ type: DELETE_SOURCE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: DELETE_SOURCE_FAIL, payload: message });
  }
};
