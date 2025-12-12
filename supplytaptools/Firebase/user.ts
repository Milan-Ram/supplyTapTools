import { doc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export const saveUser = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};
