import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userReducer from "./user";
import postReducer from "./post";
import { composeWithDevTools } from "@redux-devtools/extension";
const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //비직렬화 데이터 허용
    }).concat(thunk),
  devTools: composeWithDevTools(), //devTools 통합
});

export default store;
