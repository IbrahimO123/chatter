import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppArticle } from "./model";
import { SaveArticle } from "./model";

const initialState: AppArticle = {
  allArticles: [
    {
      text: "",
      title: "",
      subtitle: "",
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
      published: false,
    },
  ],
  anArticle: {
    text: "",
    title: "",
    subtitle: "",
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
    published: false,
  },
};

const saveArticleIntialState: SaveArticle = {
  email: "",
  name: "",
  heading: [],
  heading2: [],
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

export const saveArticleSlice = createSlice({
  name: "save_article",
  initialState: saveArticleIntialState,
  reducers: {
    updateSaveArticle(state, action: PayloadAction<SaveArticle>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateArticle } = articleSlice.actions;

export const { updateSaveArticle } = saveArticleSlice.actions;
