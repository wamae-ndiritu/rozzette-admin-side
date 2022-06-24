import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from "../Constants/CategoryConstants";

// LIST CATEGORY
export const listCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// CREATE CATEGORY
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: true,
      };
    case CATEGORY_CREATE_RESET:
      return (state = {});

    default:
      return state;
  }
};

// DELETE CATEGORY
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CATEGORY_DELETE_FAIL:
      return {
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
