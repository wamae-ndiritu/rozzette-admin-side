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

// CREATE SOURCE
export const createSourceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SOURCE_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case CREATE_SOURCE_SUCCESS:
      return {
        loading: false,
        source: action.payload,
      };
    case CREATE_SOURCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// GET SOURCES
export const listSourcesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SOURCES_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case GET_SOURCES_SUCCESS:
      return {
        loading: false,
        sources: action.payload,
      };
    case GET_SOURCES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//DELETE SOURCE
export const deleteSourceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SOURCE_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case DELETE_SOURCE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_SOURCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
