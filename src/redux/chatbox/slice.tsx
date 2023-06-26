import { createSlice } from "@reduxjs/toolkit";
import { ChatPhotos } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";
const initialState: ChatPhotos = {
  allPhotos: [
    {
      id: 0,
      albumId: 0,
      thumbnailUrl: "",
      url: "",
      title: "",
    },
  ],
  aPhoto: {
    url: "",
    id: 0,
    title: "",
    albumId: 0,
    thumbnailUrl: "",
  },
};

export const chatPhotosSlice = createSlice({
  name: "photos_slice",
  initialState: initialState,
  reducers: {
    getAllPhotos(state, action: PayloadAction<ChatPhotos["allPhotos"]>) {
      return { ...state, allPhotos: action.payload };
    },
    getAPhotos(state, action: PayloadAction<ChatPhotos["aPhoto"]>) {
      return { ...state, aPhoto: action.payload };
    },
  },
});

export const { getAllPhotos } = chatPhotosSlice.actions;


