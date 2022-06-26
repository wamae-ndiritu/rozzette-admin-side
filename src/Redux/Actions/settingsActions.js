import axios from "axios";
import { URL } from "../../Url.js";
import {
  LIST_SETTINGS_REQUEST,
  LIST_SETTINGS_SUCCESS,
  LIST_SETTINGS_FAIL,
  CONFIGURE_STKPUSH_REQUEST,
  CONFIGURE_STKPUSH_SUCCESS,
  CONFIGURE_STKPUSH_FAIL,
} from "../Constants/settingsConstants";

// GET SETTINGS
export const getSettings = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_SETTINGS_REQUEST });

    const { data } = await axios.get(`${URL}/api/settings/`);

    dispatch({ type: LIST_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIST_SETTINGS_FAIL, payload: error });
  }
};

// CONFIGURE STKPUSH
export const configureStkPush = () => async (dispatch) => {
  try {
    dispatch({ type: CONFIGURE_STKPUSH_REQUEST });

    await axios.put(`${URL}/api/settings/stkPush`);

    dispatch({ type: CONFIGURE_STKPUSH_SUCCESS });
  } catch (error) {
    dispatch({ type: CONFIGURE_STKPUSH_FAIL, payload: error });
  }
};
