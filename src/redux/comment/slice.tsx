import { createSlice } from "@reduxjs/toolkit";
import { AppComment, PostComment } from "./model";
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

//Post Comment Slice and Actions
const initialPostState: PostComment = {
  singlePostComment: {
    id: "",
    post: "",
    comment: {
      postText: "",
      authorName: "",
      userId: "",
      dateCreated: "",
      timeCreated: "",
      profileImageUrl: "",
      replies: [
        {
          postText: "",
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
  allPostComments: [
    {
      id: "",
      post: "",
      comment: {
        postText: "",
        authorName: "",
        userId: "",
        dateCreated: "",
        timeCreated: "",
        profileImageUrl: "",
        replies: [
          {
            postText: "",
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

export const postCommentSlice = createSlice({
  name: "post_comment_slice",
  initialState: initialPostState,
  reducers: {
    updatePostComment(
      state,
      action: PayloadAction<PostComment["singlePostComment"]>
    ) {
      return {
        ...state,
        singlePostComment: action.payload,
      };
    },
  },
});

export const { updatePostComment } = postCommentSlice.actions;
