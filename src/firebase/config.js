import firebase from 'firebase/app'
import 'firebase/firestore' //with firebase, you have manually import the services you are using, so we import firestore from the firebase package

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
  const timestamp = firebase.firestore.FieldValue.serverTimestamp //this returns a function that is used to create the special TimeStamp data type that firebase uses

  // export projectFirestore so that we can import it from this file and use it in component files
  // it is the reference we need to connect with our firestore database

export { projectFirestore, timestamp }