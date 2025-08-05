import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.Token = value.payload;
    },
  },
});

export const { setToken } = cartSlice.actions;
export default cartSlice.reducer;
