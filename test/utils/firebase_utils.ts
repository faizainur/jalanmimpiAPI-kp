import * as firebase from "firebase/app";
import "firebase/auth";
import "dotenv/config";

const firebaseConfig = {
  apiKey: "AIzaSyDYKtIvSeVapcmQvGyYtGCp_KZkaRzgla8",
  authDomain: "test-jalanmimpi-app.firebaseapp.com",
  databaseURL: "https://test-jalanmimpi-app.firebaseio.com",
  projectId: "test-jalanmimpi-app",
  storageBucket: "test-jalanmimpi-app.appspot.com",
  messagingSenderId: "117625197920",
  appId: "1:117625197920:web:c1bbfe728717d7114d3a05",
  measurementId: "G-HDRQJ05RWW",
};

const getTokenId = async (email: string, password: string) => {
  try {
    var user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    var token: any = await firebase.auth().currentUser?.getIdToken(true);

    await firebase.auth().signOut();

    console.log(token);
  } catch (error) {}
};

try {
  firebase.initializeApp(firebaseConfig);
  // console.log("Connected to Firebase (Test ENV)");

  getTokenId(
    process.env.EMAIL_FIREBASE as string,
    process.env.PASSWORD_FIREBASE as string
  )
    .then((data: any) => console.log(data as string))
    .catch((error) => console.log(error));
} catch (error) {
  console.error("Cannot connect to Firebase");
}
