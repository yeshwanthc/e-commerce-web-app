import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCd6p8yRaLhb7x7MBkUUQ_kMSNjlNzu4eA",
    authDomain: "yesh-db.firebaseapp.com",
    projectId: "yesh-db",
    storageBucket: "yesh-db.appspot.com",
    messagingSenderId: "395224916286",
    appId: "1:395224916286:web:a1a8a5a92bb8908f9acc6f"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup =() => 
  signInWithPopup (auth, provider);