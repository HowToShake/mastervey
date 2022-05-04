import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const cors = require("cors")({ origin: true });

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const signup = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { email, password } = request.body;

    const { uid } = await admin.auth().createUser({
      email,
      password,
    });

    response.send(uid);
  });
});

export const newUserSignup = functions.auth.user().onCreate((user, ctx) => {
  functions.logger.info("user", user, "ctx", ctx, { structuredData: true });
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
  });
});

export const deleteUser = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete;
});
