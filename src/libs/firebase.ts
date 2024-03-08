import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// import { getFirestore } from "@firebase/firestore";
// import { getStorage } from "firebase/storage";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAXizmS_ktO2hylVXQJL__oVZrK8O4ZLmM",
  authDomain: "e-shop-vid-2c764.firebaseapp.com",

  projectId: "e-shop-vid-2c764",
  storageBucket: "e-shop-vid-2c764.appspot.com",
  messagingSenderId: "387899114905",
  appId: "1:387899114905:web:3e5b227f1eea836fecff08"
};

const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// export const db = getFirestore(app);
// export const storage = getStorage(app);

export default firebaseApp;
