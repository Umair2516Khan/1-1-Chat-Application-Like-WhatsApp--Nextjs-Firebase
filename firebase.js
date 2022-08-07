import { setPersistence } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Quota Exceeded for this database XD... 
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyC_Naz3tbcQqouNcXWjVBWY7_opBIho3Cs",
//     authDomain: "whatsapp-uk.firebaseapp.com",
//     projectId: "whatsapp-uk",
//     storageBucket: "whatsapp-uk.appspot.com",
//     messagingSenderId: "54650213987",
//     appId: "1:54650213987:web:5dbc3cd70744580dcc4a56",
//     measurementId: "G-JE2E1H3BRZ",
//     setPersistence : "false",
//   };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBisqi7roMOBpY2hu4x32xz_eVnkpnGnQw",
//   authDomain: "whatsapp2-uk.firebaseapp.com",
//   projectId: "whatsapp2-uk",
//   storageBucket: "whatsapp2-uk.appspot.com",
//   messagingSenderId: "919213017035",
//   appId: "1:919213017035:web:5fe5843eee2abf770a184e",
//   measurementId: "G-PWV8M64YV5"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBQLEiafA4F12S8d9oM_oPOBuprt8H4bls",
  authDomain: "whtasapp2-by-umairkhan.firebaseapp.com",
  projectId: "whtasapp2-by-umairkhan",
  storageBucket: "whtasapp2-by-umairkhan.appspot.com",
  messagingSenderId: "1001799162909",
  appId: "1:1001799162909:web:2b8bd027e13cd001bf3af4"
};

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth , provider};