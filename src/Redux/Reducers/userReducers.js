import {
  MAKE_ADMIN_FAIL,
  MAKE_ADMIN_REQUEST,
  MAKE_ADMIN_SUCCESS,
  REMOVE_ADMIN_REQUEST,
  REMOVE_ADMIN_SUCCESS,
  REMOVE_ADMIN_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constants/UserContants";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// MAKE USER ADMIN
export const userIsAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_ADMIN_REQUEST:
      return { loading: true };
    case MAKE_ADMIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case MAKE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DIRECTOR REMOVE USER ADMIN
export const removeIsAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ADMIN_REQUEST:
      return { loading: true };
    case REMOVE_ADMIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case REMOVE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
