import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userIsAdminReducer,
  removeIsAdminReducer,
  userListReducer,
  userLoginReducer,
} from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  userOrdersReducer,
} from "./Reducers/OrderReducres";

import {
  listCategoriesReducer,
  createCategoryReducer,
  deleteCategoryReducer,
} from "./Reducers/CategoryReducers";

import { transactionListReducer } from "./Reducers/TransactionReducer";
import {
  settingsListReducer,
  stkPushReducer,
} from "./Reducers/settingsReducer";
import {
  createSourceReducer,
  listSourcesReducer,
  deleteSourceReducer,
} from "./Reducers/sourceReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  categoriesList: listCategoriesReducer,
  createCategory: createCategoryReducer,
  categoryDelete: deleteCategoryReducer,
  transactionList: transactionListReducer,
  userDetails: userDetailsReducer,
  userIsAdmin: userIsAdminReducer,
  removeIsAdmin: removeIsAdminReducer,
  userOrders: userOrdersReducer,
  sourceCreate: createSourceReducer,
  sourcesList: listSourcesReducer,
  sourceDelete: deleteSourceReducer,
  settingsList: settingsListReducer,
  stkPush: stkPushReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
