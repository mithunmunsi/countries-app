import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: 'countries-app-f7dc0.firebaseapp.com',
  projectId: 'countries-app-f7dc0',
  storageBucket: 'countries-app-f7dc0.appspot.com',
  messagingSenderId: '139725930686',
  appId: '1:139725930686:web:e86b224f0e1bd0f964deef',
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log('User created:', user);

    // Ensure Firestore document creation happens only if user is created
    try {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      });
      console.log('User document added to Firestore');
    } catch (docError) {
      console.error('Error adding user document:', docError);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert(error.message);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during login:', error);
    alert(error.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
};
