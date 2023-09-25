import { useDispatch } from "react-redux";
import { updateAUser } from "../../redux/user/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { updateUserDetails } from "../../Utilities/UpdateUserDetails";
import { updateOtherState } from "../../redux/others/slice";
import { UploadProfileImage } from "../../Utilities/UploadImage";
import { AddProfileImageToDatabase } from "../../Utilities/AddProfileImage";

export const useGeneral = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
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

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    const response = await updateUserDetails(
      {
        firstname,
        lastname,
        email,
        phoneNumber,
        facebookHandle,
        twitterHandle,
        linkedInHandle,
      },
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
    } else {
      return dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Some invalid data was passed",
          severity: "error",
        })
      );
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
    handleProfilePhotoUpload,
    updateOtherState,
    aUser,
    others,
    navigate,
    dispatch,
    user,
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
