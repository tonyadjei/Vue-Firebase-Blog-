import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBJCmOV_ksxBID3b7jdlGMp8zYhMMrlnLs",
    authDomain: "vuepractice-b2d44.firebaseapp.com",
    projectId: "vuepractice-b2d44",
    storageBucket: "vuepractice-b2d44.appspot.com",
    messagingSenderId: "26754849790",
    appId: "1:26754849790:web:d49690f81ba780f5707eaf"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)
  
  // init firestore service
  const projectFirestore = firebase.firestore()

  // export projectFirestore so that we can import it from this file and use it in component files

export { projectFirestore }