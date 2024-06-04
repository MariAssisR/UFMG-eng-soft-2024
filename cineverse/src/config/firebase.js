// import {firebase} from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseconfig = {
    apiKey: "AIzaSyCWWPFQyn7NCuZmOOaX2mwxG1oM0wyEVy8",
    authDomain: "cineverse-6845b.firebaseapp.com",
    projectId: "cineverse-6845b",
    storageBucket: "cineverse-6845b.appspot.com",
    messagingSenderId: "495429702175",
    appId: "1:495429702175:web:fdb68e34251fc484753b2a"
};

const app = initializeApp(firebaseconfig);
const auth = getAuth(app);

export { auth };
