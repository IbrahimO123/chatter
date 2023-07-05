import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Article } from "./model";


const initialState: Article = {
  text: "",
  title: "",
  authorEmail: "",
  authorName: "",
  timeCreated: "",
  likes: 0,
  comments: {
    numberOfComments: 0,
    text: [],
  },
  repost: 0,
  readOnly: true,
};

export const articleSlice = createSlice({
  name: "article_slice",
  initialState,
  reducers: {
    getArticle(state) {
      return {
        ...state,
      };
    },
    updateArticle(state, action: PayloadAction<Article>) {
      return {
        ...state,
        Article: action.payload,
      };
    },
  },
});

export const { getArticle, updateArticle } = articleSlice.actions;
