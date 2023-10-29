import { createSlice } from "@reduxjs/toolkit";
import { AppComment } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: AppComment = {
  aComment: {
    id: "",
    article: "",
    comment: {
      text: "",
      authorName: "",
      userId: "",
      dateCreated: "",
      timeCreated: "",
      profileImageUrl: "",
      replies: [
        {
          text: "",
          authorName: "",
          userId: "",
          dateCreated: "",
          timeCreated: "",
          profileImageUrl: "",
        },
      ],
      commentLikes: [],
    },
  },
  allComments: [
    {
      id: "",
      article: "",
      comment: {
        text: "",
        authorName: "",
        userId: "",
        dateCreated: "",
        timeCreated: "",
        profileImageUrl: "",
        replies: [
          {
            text: "",
            authorName: "",
            userId: "",
            dateCreated: "",
            timeCreated: "",
            profileImageUrl: "",
          },
        ],
        commentLikes: [],
      },
    },
  ],
};

export const commentSlice = createSlice({
  name: "comment_slice",
  initialState,
  reducers: {
    updateComment(state, action: PayloadAction<AppComment["aComment"]>) {
      return {
        ...state,
        aComment: action.payload,
      };
    },
  },
});

export const { updateComment } = commentSlice.actions;
