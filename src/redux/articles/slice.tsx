import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppArticle } from "./model";
import { Draft } from "./model";

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

const saveDraftsIntialState: Draft = {
  drafts: [
    {
      id: "",
      data: [
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
    },
  ],
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

export const saveDraftsSlice = createSlice({
  name: "save_drafts",
  initialState: saveDraftsIntialState,
  reducers: {
    updateSaveDrafts(state, action: PayloadAction<Draft>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateArticle } = articleSlice.actions;

export const { updateSaveDrafts } = saveDraftsSlice.actions;
