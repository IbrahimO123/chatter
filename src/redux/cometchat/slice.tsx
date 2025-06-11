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
    uid: "",
    role: " ",
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
  cometModal: {
    open: false,
    error: "",
  
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
    updateCometChatUser(
      state,
      action: PayloadAction<CometChatUser["aCometUser"]>
    ) {
      return { ...state, aCometUser: action.payload };
    },
    openChatModal(state, action: PayloadAction<CometChatUser["cometModal"]>) {
      return { ...state, cometModal: action.payload };
    },
  },
});

export const {
  getAllCometUsers,
  getACometUser,
  updateCometChatUser,
  openChatModal,
} = cometChatSlice.actions;
