import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../firebase";

const initialStateValue = {
  nickName: "", //양홍련
  email: "", //이메일
  password: "",
  grade: "🌱소중한 자모",
  visitCount: 0,
  postNumber: 0,
  commentNumber: 0,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
      const user = userCredential.user;
      return {
        nickName: user.displayName || "Unknown",
        email: user.email,
        password,
        grade: "🌱소중한 자모",
        visitCount: 0,
        postNumber: 0,
        commentNumber: 0,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
