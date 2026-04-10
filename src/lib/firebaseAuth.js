import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

// 🔐 SIGNUP
export const signupUser = async (form) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );

  const user = userCredential.user;

  // Save extra data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    createdAt: new Date(),
  });

  return user;
};

// 🔐 LOGIN
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// 🔐 GOOGLE LOGIN
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Save user in Firestore (if not exists)
  await setDoc(
    doc(db, "users", user.uid),
    {
      fullName: user.displayName,
      email: user.email,
      phone: user.phoneNumber || "",
      createdAt: new Date(),
    },
    { merge: true }
  );

  return user;
};

export const getGoogleUserEmail = (user) =>
  user?.email || user?.providerData?.[0]?.email || "";

export const getGoogleUserName = (user) =>
  user?.displayName || user?.providerData?.[0]?.displayName || "";