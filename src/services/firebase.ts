// Import the functions you need from the SDKs you need
import { randomUUID } from 'crypto';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, ref, onValue, set } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4R6qRiV4wZcvpQNOv8AN7KrHiIgcETDE",
  authDomain: "artech-cms-chat.firebaseapp.com",
  databaseURL: "https://artech-cms-chat-default-rtdb.firebaseio.com",
  projectId: "artech-cms-chat",
  storageBucket: "artech-cms-chat.appspot.com",
  messagingSenderId: "1086762167768",
  appId: "1:1086762167768:web:40cb52e1d33e9a78a396ad",
  measurementId: "G-MHDFVGKD6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export function activateUpdate(setState: any) {
    const db = getDatabase(app);
    const starCountRef = ref(db, '/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.keys(data).map(key => data[key]);
      setState(dataArray);
  
    });
  }
  
interface WriteUserData{
    name: string;
    email: string;
    message: string;
    chat: string; //name1-name2-uuid
}
export function writeUserData({name, email, message, chat}: WriteUserData) {
    const db = getDatabase(app);
    const aux = Date.now();
    set(ref(db, `/chat/${chat}-${randomUUID().substring(0,6)}`), {
        message,
        name,
        email,
        createdAt: aux,
    });

}
  


