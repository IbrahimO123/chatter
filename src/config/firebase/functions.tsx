import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from ".";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  let result;
  let error;
  try {
    result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // if (credential?.accessToken !== null) {
    //   const user = result.user;
    //   return user;
    // }
  } catch (err) {
    error = err
    console.error(err);
  }
  return {
    result,
    error,
  }
};
