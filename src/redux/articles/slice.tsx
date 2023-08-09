import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppArticle } from "./model";

const initialState: AppArticle = {
  allArticles: [
    {
      text: "",
      title: "",
      html: "",
      authorEmail: "",
      authorName: "",
      timeCreated: new Date().toLocaleTimeString(),
      dateCreated: new Date().toLocaleDateString(),

      likes: 0,
      comments: {
        numberOfComments: 0,
        text: [],
      },
      categories: [],
      repost: 0,
      readOnly: true,
      coverImage: "",
    },
  ],
  anArticle: {
    text: "",
    title: "",
    html: "",
    authorEmail: "",
    authorName: "",
    timeCreated: new Date().toLocaleTimeString(),
    dateCreated: new Date().toLocaleDateString(),
    likes: 0,
    comments: {
      numberOfComments: 0,
      text: [],
    },
    categories: [],
    repost: 0,
    readOnly: true,
    coverImage: "",
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
