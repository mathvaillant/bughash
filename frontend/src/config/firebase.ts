import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB62vLKyroMN6E4FdQfZCuJj3SrS40iINU",
  authDomain: "bughash-app.firebaseapp.com",
  databaseURL: "https://bughash-app-default-rtdb.firebaseio.com",
  projectId: "bughash-app",
  storageBucket: "bughash-app.appspot.com",
  messagingSenderId: "79346847220",
  appId: "1:79346847220:web:486c2cda3dbef603933da1",
  measurementId: "G-03JNZPMH6E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);