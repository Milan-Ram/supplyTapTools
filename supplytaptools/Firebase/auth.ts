import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/FirebaseConfig"
import { saveUser } from "./user";

export const registerEmailPassword = async (email: string, password: string, name: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await saveUser(res.user.uid, {
    uid: res.user.uid,
    name,
    email,
    provider: "email",
    createdAt: Date.now(),
  });
  return res.user;
};

export const loginEmailPassword = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;

  await saveUser(user.uid, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    provider: "google",
    photo: user.photoURL,
    lastLogin: Date.now(),
  });

  return user;
};
