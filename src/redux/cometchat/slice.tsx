import { createSlice } from "@reduxjs/toolkit";
import { CometChatUser } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";
const initialState: CometChatUser = {
  allCometUsers: [
    {
      name: "",
      uid: "",
      role: "",
      avatar: "",
      link: "",
      metadata: {
        "@private": {
          email: "",
          contactNumber: "",
        },
      },
      tags: [],
      withAuthToken: false,
    },
  ],
  aCometUser: {
    name: "",
    uid: Date.now().toString(36)+Math.random().toString(36).substring(2, 12).padStart(12, "0"),
    role: "mbhactes00m13eeohis9",
    avatar: "",
    link: "",
    metadata: {
      "@private": {
        email: "",
        contactNumber: "",
      },
    },
    tags: [],
    withAuthToken: false,
  },
};

export const cometChatSlice = createSlice({
  name: "comet_slice",
  initialState: initialState,
  reducers: {
    getAllCometUsers(
      state,
      action: PayloadAction<CometChatUser["allCometUsers"]>
    ) {
      return { ...state, allCometUsers: action.payload };
    },
    getACometUser(state, action: PayloadAction<CometChatUser["aCometUser"]>) {
      return { ...state, aCometUser: action.payload };
    },
  },
});

export const { getAllCometUsers, getACometUser } = cometChatSlice.actions;
