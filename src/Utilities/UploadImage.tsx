import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const UploadCoverImage = async (file: any, filename: string) => {
  try {
    const imageRef = ref(storage, filename);
    const res = await uploadBytes(imageRef, file as Blob);
    if (res) {
      const url = await getDownloadURL(ref(storage, filename));
      return url;
    }
    return false;
  } catch (e: any) {
    console.log(e.message);
  }
};

export const UploadProfileImage = async (file: any, filename: string) => {
  try {
    const photoRef = ref(storage, `profileImages/${filename}`);
    const res = await uploadBytes(photoRef, file as Blob);
    if (res) {
      const url = await getDownloadURL(
        ref(storage, `profileImages/${filename}`)
      );
      return url;
    }
    return false;
  } catch (e: any) {
    console.log("Error while uploading image", e.code);
  }
};
