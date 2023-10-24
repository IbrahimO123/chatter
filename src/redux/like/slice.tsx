import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { LikeType } from "./model";

const initialState: LikeType = {
  aLike: {
    value: false,
    who: "",
    whoId: "",
    when: new Date().toISOString(),
    articleId: "",
  },
  allLikes: [
    {
      value: false,
      who: "",
      whoId: "",
      when: new Date().toISOString(),
      articleId: "",
    },
  ],
};

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
});

export const { updateLike } = likeSlice.actions;
