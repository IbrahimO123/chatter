import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from ".";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken !== null) {
      const user = result.user;
      return user;
    }
  } catch (err) {
    console.error(err);
    if (err === "auth/account-exists-with-different-credential") {
      return "user already exists";
    }
  }
};
