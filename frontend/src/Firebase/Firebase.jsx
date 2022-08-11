import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAD7NMg9sciUXLsbZ7xBNdokzHmBH8snV4",
  authDomain: "gauto-b16f8.firebaseapp.com",
  projectId: "gauto-b16f8",
  storageBucket: "gauto-b16f8.appspot.com",
  messagingSenderId: "370149486055",
  appId: "1:370149486055:web:fc26f7e218a78f48522142",
  measurementId: "G-YGVZY0RSRZ"
};


  const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };