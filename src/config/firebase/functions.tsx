import { signInWithPopup } from "firebase/auth";
import { auth, provider } from ".";

export const signInWithGoogle = async () => {
  let result;
  let error;
  try {
    result = await signInWithPopup(auth, provider);
  } catch (err) {
    error = err;
    console.error(err);
  }
  return {
    result,
    error,
  };
};
