import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAUser } from "../../redux/user/slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { updateUserDetails } from "../../Utilities/UpdateUserDetails";
import { updateOtherState } from "../../redux/Others/slice";
import { UploadProfileImage } from "../../Utilities/UploadImage";
import { AddProfileImageToDatabase } from "../../Utilities/AddProfileImage";
import { updateUserSchema } from "../../config/joi";
import { CopyToClipboard } from "../functions/CopyToClipboard";
import { getLoggedInUser } from "../../Utilities/GetUserData";
import { useChat } from "./useChat";
import { addCometChatAuthTokenToDatabase } from "../../Utilities/SaveAuthToken";


export const useGeneral = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState<File>();
  const { state: locationState } = location;
  const { aUser } = useSelector((state: RootState) => state.users);
  const { handleAddUserToCometChat, createAuthTokenToCometChat } = useChat();

  const {
    firstname,
    lastname,
    phoneNumber,
    email,
    password,
    confirmPassword,
    profileImageUrl,
    facebookHandle,
    twitterHandle,
    linkedInHandle,
    dateCreated,
  } = aUser;

  const others = useSelector((state: RootState) => state.others);
  const { loading } = others;
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAUser({ ...aUser, [e.target.name]: e.target.value }));
  };
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = e.target.files;
    if (!fileList) {
      e.target.value = "";
      return console.log("No image selected");
    }
    let imageObj = e.target!.files![0];
    const { size, type } = imageObj;
    const ext = type.split("/")[0];
    const mb = size / 1000000;
    if (mb > 2) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Size exceeds the maximum allowed",
          severity: "error",
        })
      );
      e.target.value = "";
      setProfileImage(undefined);
      return false;
    } else if (ext !== "image") {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Please upload image only",
          severity: "error",
        })
      );
      e.target.value = "";
      setProfileImage(undefined);
      return false;
    } else {
      setProfileImage(e.target!.files![0]);
    }
  };

  //handle user details update
  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    await getLoggedInUser({ user, dispatch, aUser });
    if (
      aUser.cometAuthToken === "" ||
      aUser.cometAuthToken === null ||
      aUser.cometAuthToken === undefined
    ) {
      const res = await handleAddUserToCometChat({
        firstname: aUser.firstname,
        lastname: aUser.lastname,
        email: aUser.email,
        phoneNumber: aUser.phoneNumber,
      });
      if (res.uid) {
        const data = await createAuthTokenToCometChat(res.uid);
        await addCometChatAuthTokenToDatabase(
          {
            uid: data.uid,
            email: aUser.email,
            authToken: data.authToken,
            force: false,
          },
          data.uid
        );
        const response = await updateUserDetails(
          { ...aUser, cometAuthToken: data.authToken, cometUid: data.uid },
          email
        );
        if (response === "Done") {
          return dispatch(
            updateOtherState({
              ...others,
              open: true,
              message: "User data updated successfully",
              severity: "success",
            })
          );
        }
      }
    }

    const { error, value } = updateUserSchema.validate({
      firstname,
      lastname,
      email,
      phoneNumber,
      facebookHandle,
      twitterHandle,
      linkedInHandle,
    });
    if (error) {
      return dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: error.message,
          severity: "error",
        })
      );
    } else {
      const response = await updateUserDetails(value, email);
      if (response === "Done") {
        return dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "User data updated successfully",
            severity: "success",
          })
        );
      }
    }
  };

  //handle profile photo of the user
  const handleProfilePhotoUpload = async (image: File) => {
    try {
      const response = await UploadProfileImage(image, user?.uid!);
      if (response) {
        dispatch(updateAUser({ ...aUser, profileImageUrl: response }));
        await AddProfileImageToDatabase({ profileImageUrl: response }, email);
        dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "Profile photo uploaded successfully",
            severity: "success",
          })
        );
      } else {
        return dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "Error while uploading photo",
            severity: "error",
          })
        );
      }
    } catch (err: any) {
      console.log("Error while uploading profile photo", err.code);
    }
  };

  const handleCopy = (text: string) => {
    const res = CopyToClipboard(text);
    if (res) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Copy to clipboard",
          severity: "success",
        })
      );
    }
  };

  return {
    handleUserChange,
    handleUpdateUser,
    handleSelectImage,
    handleProfilePhotoUpload,
    handleCopy,
    updateOtherState,
    aUser,
    others,
    navigate,
    location,
    locationState,
    dispatch,
    user,
    setProfileImage,
    profileImage,
    firstname,
    lastname,
    phoneNumber,
    email,
    password,
    confirmPassword,
    profileImageUrl,
    facebookHandle,
    twitterHandle,
    linkedInHandle,
    dateCreated,
    loading,
  };
};
