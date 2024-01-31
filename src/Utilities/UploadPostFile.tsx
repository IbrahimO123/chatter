import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (image: File) => {
  try {
    const imageRef = ref(storage, `postsImages/${image.name}`);
    const snapshot = await uploadBytes(imageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (e: any) {
    console.log("Error uploading", e.message);
    return;
  }
};


export const uploadVideo = async (video: File) => {
  try {
    const videoRef = ref(storage, `postsVideos/${video.name}`);
    const snapshot = await uploadBytes(videoRef, video);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (e: any) {
    console.log("Error uploading", e.message);
    return;
  }
};
