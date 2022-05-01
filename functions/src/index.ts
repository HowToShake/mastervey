import * as functions from "firebase-functions";

const regionalFunctions = functions.region("europe-west1");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = regionalFunctions.https.onRequest(
  (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);
