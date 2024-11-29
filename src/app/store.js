import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "../features/addToCart.js";
import isAuthenticatedReducer from "../features/auth.js";

export default configureStore({
  reducer: {
    cart: addToCartReducer,
    auth: isAuthenticatedReducer,
  },
});
