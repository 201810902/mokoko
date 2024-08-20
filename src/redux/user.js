import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  value: {
    nickName: "", //양홍련
    email: "", //이메일
    password: "",
    grade: "🌱소중한 자모",
    visitCount: 0,
    postNumber: 0,
    commentNumber: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
