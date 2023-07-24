import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppArticle } from "./model";

const initialState: AppArticle = {
  allArticles: [
    {
      text: "",
      title: "",
      authorEmail: "",
      authorName: "",
      timeCreated: new Date().toLocaleTimeString(),
      likes: 0,
      comments: {
        numberOfComments: 0,
        text: [],
      },
      categories: [],
      repost: 0,
      readOnly: true,
    },
  ],
  anArticle: {
    text: "",
    title: "",
    authorEmail: "",
    authorName: "",
    timeCreated: new Date().toLocaleTimeString(),
    likes: 0,
    comments: {
      numberOfComments: 0,
      text: [],
    },
    categories: [],
    repost: 0,
    readOnly: true,
  },
};

export const articleSlice = createSlice({
  name: "article_slice",
  initialState,
  reducers: {
    updateArticle(state, action: PayloadAction<AppArticle["anArticle"]>) {
      return {
        ...state,
        anArticle: action.payload,
      };
    },
  },
});

export const { updateArticle } = articleSlice.actions;
