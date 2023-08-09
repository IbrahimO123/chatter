import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const UploadImage = async (file: any, filename: string) => {
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
