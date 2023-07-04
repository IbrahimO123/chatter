import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { chatPhotosSlice } from "./chatbox/slice";
import { postSlice } from "./posts/slice";
import { userSlice } from "./user/slice";
import { otherSlice } from "./Others/slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { articleSlice } from "./articles/slice";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey:
        process.env.REACT_APP_SECRET_KEY ||
        "scgsxvsndbcfgffshdvbcgscxfhvbxccfygacsr",
      onError: (err) => {
        console.log("err", err);
      },
    }),
  ],
};

export const rootReducers = combineReducers({
  chats: chatPhotosSlice.reducer,
  posts: postSlice.reducer,
  users: userSlice.reducer,
  others: otherSlice.reducer,
  articles: articleSlice.reducer,
});

const persistReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
