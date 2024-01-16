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

export const useGeneral = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState<File>();
  const { state: locationState } = location;
  const { aUser } = useSelector((state: RootState) => state.users);
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
  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
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

  return {
    handleUserChange,
    handleUpdateUser,
    handleSelectImage,
    handleProfilePhotoUpload,
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
