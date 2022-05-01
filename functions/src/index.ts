import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const express = require("express");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.set("Access-Control-Allow-Origin", "*").send("Hello from Firebase!");
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

exports.widgets = functions.https.onRequest(app);
