import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { LikeType } from "./model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LikePostType } from "./model";

const initialState: LikeType = {
  aLike: {
    value: false,
    article: "",
    who: "",
    whoId: "",
    when: new Date().toISOString(),
    articleId: "",
  },
  allLikes: [
    {
      value: false,
      article: "",
      who: "",
      whoId: "",
      when: new Date().toISOString(),
      articleId: "",
    },
  ],
};
export const updateLikeAsync = createAsyncThunk(
  "like/update",
  async (like: LikeType["aLike"], { rejectWithValue }) => {
    try {
      return { ...like };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const likeSlice = createSlice({
  name: "like_slice",
  initialState,
  reducers: {
    updateLike(state, action: PayloadAction<LikeType["aLike"]>) {
      return {
        ...state,
        aLike: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateLikeAsync.fulfilled, (state, { payload }) => {
      return { ...state, aLike: payload };
    });
  },
});

export const { updateLike } = likeSlice.actions;

//Post actions and intialization
const initialPostState: LikePostType = {
  aLike: {
    value: false,
    content: "",
    who: "",
    whoId: "",
    when: new Date().toISOString(),
    postId: "",
  },
  allLikes: [
    {
      value: false,
      content: "",
      who: "",
      whoId: "",
      when: new Date().toISOString(),
      postId: "",
    },
  ],
};
export const updateLikePostAsync = createAsyncThunk(
  "likepost/update",
  async (like: LikePostType["aLike"], { rejectWithValue }) => {
    try {
      return { ...like };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const likePostSlice = createSlice({
  name: "like_slice_post",
  initialState: initialPostState,
  reducers: {
    updateLikePost(state, action: PayloadAction<LikePostType["aLike"]>) {
      return {
        ...state,
        aLike: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateLikePostAsync.fulfilled, (state, { payload }) => {
      return { ...state, aLike: payload };
    });
  },
});

export const { updateLikePost } = likePostSlice.actions;
