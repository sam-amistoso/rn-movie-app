import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./app.state";

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
