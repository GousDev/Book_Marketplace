import { createSlice } from "@reduxjs/toolkit";

export const addToCart = createSlice({
  name: "cart",
  initialState: {
    values: [],
  },
  reducers: {
    addItemsToCart: (state, action) => {
      if (!state.values.includes(action.payload)) {
        state.values.push(action.payload);
      }
    },
  },
});

export const {addItemsToCart} = addToCart.actions;
export default addToCart.reducer