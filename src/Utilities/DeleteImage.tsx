import { getStorage, ref, deleteObject } from "firebase/storage";

export const DeleteImage = (path: string) => {
  const storage = getStorage();
  const desertRef = ref(storage, path);
  deleteObject(desertRef)
    .then(() => {
      return "image deleted";
    })
    .catch((error) => {
      return "error deleting image";
    });
};
