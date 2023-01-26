import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBFXhmleTafRhzKUOuh-5XA_wCnDBnbNCs",
  authDomain: "crwn-clothing-9e5ea.firebaseapp.com",
  projectId: "crwn-clothing-9e5ea",
  storageBucket: "crwn-clothing-9e5ea.appspot.com",
  messagingSenderId: "663415707650",
  appId: "1:663415707650:web:6a45c25659b931ea05ef1b"
};

const firebaseApp = initializeApp(firebaseConfig);


// Google Giriş
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt : "select_account"
});
// Google Giriş


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth , googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit();
  console.log("done");
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  
}


// Auth Veri Tabanı Oluşturma
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const  createdAt = new Date();

      try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        })
      } catch (error) {
        console.log('error creating the user', error.message);
      }
      
    }

    return userDocRef;
};
// Auth Veri Tabanı Oluşturma


// Email Şifre ile üyelik oluşturma
export const createAuthUserWithEmailAndPassword = async  (email,password) => {
  if(!email ||!password) return ;

  return await createUserWithEmailAndPassword(auth,email,password)
}
// Email Şifre ile üyelik oluşturma


// Email Şifre ile Giriş Yapma
export const signInAuthUserWithEmailAndPassword = async  (email,password) => {
  if(!email || !password) return ;

  return await signInWithEmailAndPassword(auth,email,password)
}
// Email Şifre ile Giriş Yapma

// çıkış yapma
export const signOutUser = async () => await signOut(auth);
// çıkış yapma

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);

export default firebaseApp;