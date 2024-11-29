import { createSlice } from "@reduxjs/toolkit";

export const isAuthenticated = createSlice({
  name: "auth",
  initialState: {
    values: false,
  },
  reducers: {
    authenticate: (state) => {
      state.values = true;
    },
    deAuthenticate: (state) => {
      state.values = false;
    },
  },
});

export const { authenticate, deAuthenticate } = isAuthenticated.actions;
export default isAuthenticated.reducer;
