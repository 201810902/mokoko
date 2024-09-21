import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userReducer from "./user";
import persistedPostReducer from "./post";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //localStorage 기본으로 사용

const rootReducer = combineReducers({
  user: userReducer,
  // post: postReducer,
  post: persistedPostReducer,
});
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //비직렬화 데이터 허용
    }).concat(thunk),
  devTools: import.meta.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);
export default store;

export { persistor };
