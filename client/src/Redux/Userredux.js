import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "userDetails",
  initialState: {
    userInfo: [],
  },
  reducers: {
    userActive: (state, action) => {
      state.userInfo.push(action.payload);
    },
    removeData: (state) => {
      state.userInfo = [];
    },
  },
});

export const { userActive, removeData } = user.actions;
export default user.reducer;
