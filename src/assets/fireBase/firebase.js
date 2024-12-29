// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgQzzZLiAeNtmY0tJU2LtQlX6o87pZ5cs",
  authDomain: "serenelanka-f4892.firebaseapp.com",
  projectId: "serenelanka-f4892",
  storageBucket: "serenelanka-f4892.firebasestorage.app",
  messagingSenderId: "318414012770",
  appId: "1:318414012770:web:0f35dcbc07299c7dc52c3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function getAuthDetails() {
  const provider = new GoogleAuthProvider(); // Correctly create a new instance
  const auth = getAuth(app);
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Sign-in successful:", result);
    return result; // Optional: Return the result if needed
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error; // Propagate the error if further handling is needed
  }
}

export default getAuthDetails; // Export the function, not its execution
