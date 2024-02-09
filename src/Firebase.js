
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZOjgXmHCDaWe7q1U22CRbYJ3CyWik42c",
  authDomain: "virtual-help-d9c36.firebaseapp.com",
  projectId: "virtual-help-d9c36",
  storageBucket: "virtual-help-d9c36.appspot.com",
  messagingSenderId: "60083030567",
  appId: "1:60083030567:web:4cacbb228dc47aa42c9c02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;