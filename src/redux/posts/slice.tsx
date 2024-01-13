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
      userId: 0,
      picture: "",
      video: "",
      event: "",
      timeCreated: "",
      dateCreated: "",
    },
  ],
  aPost: {
    likesCount: 0,
    sharesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    content: "",
    author: "",
    userId: 0,
    picture: "",
    video: "",
    event: "",
    timeCreated: "",
    dateCreated: "",
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
