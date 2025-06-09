import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cometChatSlice } from "./cometchat/slice";
import { postSlice } from "./posts/slice";
import { userSlice } from "./user/slice";
import { otherSlice } from "./Others/slice";
import { articleSlice } from "./articles/slice";
import { saveDraftsSlice } from "./articles/slice";
import { likeSlice, likePostSlice } from "./like/slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import storageSession from "redux-persist/lib/storage/session";

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
import { commentSlice, postCommentSlice } from "./comment/slice";

const persistConfig = {
  key: "session",
  storage: storageSession,
  blacklist: [
    "users",
    "chats",
    "posts",
    "others",
    "saveDrafts",
    "comment",
    "like",
    "likePosts",
    "postComments",
  ],
};

export const sessionReducer = combineReducers({
  others: otherSlice.reducer,
  articles: articleSlice.reducer,
  cometChat: cometChatSlice.reducer,
  posts: postSlice.reducer,
  users: userSlice.reducer,
  saveDrafts: saveDraftsSlice.reducer,
  comment: commentSlice.reducer,
  like: likeSlice.reducer,
  likePosts: likePostSlice.reducer,
  postComments: postCommentSlice.reducer,
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
