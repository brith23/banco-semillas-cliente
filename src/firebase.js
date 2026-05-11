import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBiJqFZwbJQIG1cPg09QWS-VcjW3d1ccUI",
  authDomain: "banco-semillas.firebaseapp.com",
  projectId: "banco-semillas",
  storageBucket: "banco-semillas.firebasestorage.app",
  messagingSenderId: "332559076010",
  appId: "1:332559076010:web:318732bff3b650aeb59ed3",
  measurementId: "G-228JSF8V05"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)