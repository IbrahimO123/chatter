import { createSlice } from "@reduxjs/toolkit";
import { AppPosts } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: AppPosts = {
  allPosts: [
    {
      id: 0,
      likesCount: 0,
      sharesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      content: "",
      author: "",
      userId: 0,
      title: "",
      body: "",
    },
  ],
  aPost: {
    id: 0,
    likesCount: 0,
    sharesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    content: "",
    author: "",
    userId: 0,
    title: "",
    body: "",
  },
};

export const postSlice = createSlice({
  name: "post_slice",
  initialState,
  reducers: {
    getAllPosts(state, action: PayloadAction<AppPosts["allPosts"]>) {
      return { ...state, allPosts: action.payload };
    },
    getAPost(state, action: PayloadAction<AppPosts["aPost"]>) {
      return { ...state, aPost: action.payload };
    },
  },
});

export const { getAllPosts, getAPost } = postSlice.actions;

