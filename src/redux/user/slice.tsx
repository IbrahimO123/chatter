import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppUser, User } from "./model";
import { PayloadAction } from "@reduxjs/toolkit";
import { hashPassword } from "../../Utilities/securePassword";
import { addToDatabase } from "../../Utilities/AddDrafts";

const initialState: AppUser = {
  allUsers: [
    {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      isAuthorised: false,
      isLoggedIn: false,
      isRegistered: false,
      dateCreated: new Date().toLocaleDateString(),
      timeCreated: new Date().toLocaleTimeString(),
      profileImageUrl: "",
    },
  ],
  aUser: {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isAuthorised: false,
    isLoggedIn: false,
    isRegistered: false,
    dateCreated: new Date().toLocaleDateString(),
    timeCreated: new Date().toLocaleTimeString(),
    profileImageUrl: "",
  },
};

export const updateUserAsync = createAsyncThunk(
  "user/update",
  async (user: User, { rejectWithValue }) => {
    try {
      if (user.email) {
        return { ...user };
      }
    } catch (err) {
      return rejectWithValue(err);
    }
    return { ...user };
  }
);

export const updateAUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (userData: User, { rejectWithValue }) => {
    try {
      hashPassword(userData.password)
        .then(({ hash, done }) => {
          if (done) {
            return {
              ...userData,
              password: hash,
              confirmPassword: hash,
              isRegistered: true,
              isAuthorised: true,
            };
          } else return { ...userData };
        })
        .then((data) => {
          addToDatabase(data, userData.email);
        });
      return { ...userData, isRegistered: true, isAuthorised: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    updateAUser(state, action: PayloadAction<AppUser["aUser"]>) {
      return { ...state, aUser: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAUserPassword.fulfilled, (state, { payload }) => {
      return { ...state, aUser: payload };
    });
    builder.addCase(updateAUserPassword.rejected, (state) => {
      return { ...state };
    });

    builder.addCase(updateAUserPassword.pending, (state) => {
      return state;
    });

    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      return { ...state, aUser: payload };
    });
  },
});

export const { updateAUser } = userSlice.actions;
