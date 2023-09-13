import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

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
