import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyD7AeWZvqhWFDcDJmpXb_ZkR5eq3IpcRbk",
    authDomain: "crwn-db-4e0dc.firebaseapp.com",
    databaseURL: "https://crwn-db-4e0dc.firebaseio.com",
    projectId: "crwn-db-4e0dc",
    storageBucket: "crwn-db-4e0dc.appspot.com",
    messagingSenderId: "220908135593",
    appId: "1:220908135593:web:28e94e18b652fa7cdcf5b8",
    measurementId: "G-KZE65PEHQW"
  };
  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const {displayName, email, } = userAuth;
      const createdAt = new Date ();
      try  {
        await userRef.set ({
          displayName,
          email,
          createdAt, 
          ...additionalData
        })
      } catch (error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  
  export const auth  = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;