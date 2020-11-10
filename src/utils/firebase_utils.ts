import admin from "firebase-admin";

// Private key for firebase Admin
const serviceAccount = require("../../misc/serviceAccountKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-jalanmimpi-app.firebaseio.com",
  });
  console.log("Connected to firebase");
} catch (error) {
  console.log(error);
}

export { admin };
