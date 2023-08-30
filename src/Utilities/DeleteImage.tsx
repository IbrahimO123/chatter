import { getStorage, ref, deleteObject } from "firebase/storage";

export const DeleteImage = (path: string) => {
  const storage = getStorage();

  // Create a reference to the file to delete
  const desertRef = ref(storage, path);
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      return "image deleted";
    })
    .catch((error) => {
      return "error deleting image";
    });
};
