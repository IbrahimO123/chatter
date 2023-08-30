import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { chatPhotosSlice } from "./chatbox/slice";
import { postSlice } from "./posts/slice";
import { userSlice } from "./user/slice";
import { otherSlice } from "./Others/slice";
import { articleSlice } from "./articles/slice";
import { saveDraftsSlice } from "./articles/slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import storageSession from "redux-persist/lib/storage/session";
import { v4 as uuidv4 } from "uuid";

import { encryptTransform } from "redux-persist-transform-encrypt";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

const persistConfig = {
  key: "session",
  storage: storageSession,
  blacklist: ["users", "chats", "posts", "others"],
  transforms: [
    encryptTransform({
      secretKey: uuidv4(),
      onError: (err) => {
        console.log("err", err);
      },
    }),
  ],
};

// const persistConfigStorage = {
//   key: "save",
//   storage: storage,
//   blacklist: ["users", "chats", "posts", "others", "articles"],
//   transforms: [
//     encryptTransform({
//       secretKey: process.env.REACT_APP_SECRET_KEY!,
//       onError: (err) => {
//         console.log("err", err);
//       },
//     }),
//   ],
// };

export const sessionReducer = combineReducers({
  others: otherSlice.reducer,
  articles: articleSlice.reducer,
  chats: chatPhotosSlice.reducer,
  posts: postSlice.reducer,
  users: userSlice.reducer,
  //saveArticles: persistReducer(persistConfigStorage, saveArticleSlice.reducer),
  saveDrafts: saveDraftsSlice.reducer,
});

const persistReducers = persistReducer(persistConfig, sessionReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
