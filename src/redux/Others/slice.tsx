import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherState } from "./model";

const initialState: OtherState = {
  message: "",
  open: false,
  close: false,
  error: "",
  loading: false,
  severity: "info",
};

export const otherSlice = createSlice({
  name: "others_state",
  initialState,
  reducers: {
    updateOtherState: (state, action: PayloadAction<OtherState>) => {
      return { ...state, ...action.payload };
    },
  },
});


export const { updateOtherState } = otherSlice.actions;
