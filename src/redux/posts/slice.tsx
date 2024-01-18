import { createSlice } from "@reduxjs/toolkit";
import { AppPosts } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: AppPosts = {
  allPosts: [
    {
      likesCount: 0,
      sharesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      content: "",
      author: "",
      userId: "",
      picture: "",
      video: "",
      event: "",
      timeCreated: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
      profileImageUrl: "",
    },
  ],
  aPost: {
    likesCount: 0,
    sharesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    content: "",
    author: "",
    userId: "",
    picture: "",
    video: "",
    event: "",
    timeCreated: new Date().toISOString(),
    dateCreated: new Date().toISOString(),
    profileImageUrl: "",
  },
};

export const postSlice = createSlice({
  name: "post_slice",
  initialState,
  reducers: {
    updateAllPosts(state, action: PayloadAction<AppPosts["allPosts"]>) {
      return { ...state, allPosts: action.payload };
    },
    updateAPost(state, action: PayloadAction<AppPosts["aPost"]>) {
      return { ...state, aPost: action.payload };
    },
  },
});

export const { updateAllPosts, updateAPost } = postSlice.actions;
