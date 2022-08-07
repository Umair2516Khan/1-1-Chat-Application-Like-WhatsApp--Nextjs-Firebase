import '../styles/globals.css';
import Login from './login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth , db } from '../firebase';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [user,loading]=useAuthState(auth);
  useEffect(()=>{
 if(user){
  db.collection('users').doc(user.uid).set({
    email : user.email,
    lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
    photoURL : user.photoURL,
    userName : user.displayName,
  },{merge: true});
 }
  },[user]);

  if(loading){ return(
    <>
    <Head>
        <link rel="shortcut icon" href="/Favicon.ico" />
      </Head>
    <Loading />
    </>
    )}
  if(!user){ return(
     <>
  <Head>
        <link rel="shortcut icon" href="/Favicon.ico" />
      </Head>
   <Login />
   </>
  )
   }
  return(
    <>
    <Head>
        <link rel="shortcut icon" href="/Favicon.ico" />
      </Head>
    <Component {...pageProps} />
    </>
  )

}

export default MyApp
