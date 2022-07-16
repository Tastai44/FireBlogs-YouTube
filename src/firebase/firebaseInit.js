import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBz0Aab_MvE6TWyji1TfGPtdb_9-w77KvE",
    authDomain: "vuetest-b524e.firebaseapp.com",
    projectId: "vuetest-b524e",
    storageBucket: 'gs://vuetest-b524e.appspot.com',
    messagingSenderId: "936706244961",
    appId: "1:936706244961:web:6f07c70358c110698ec520"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { timestamp }
  export default firebaseApp.firestore()