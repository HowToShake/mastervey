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

    // await admin.firestore().

    // await admin.

    response.send(uid);
  });
});

export const createSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    // .then((decoded) => res.status(200).send(decoded))
    // .catch((err) => res.status(401).send(err));

    return await admin
      .firestore()
      .collection("surveys")
      .doc()
      .create({ userId: uid, create: {}, answers: {} });
  });
});

export const getSurveys = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("userId", "==", uid).get();

    functions.logger.log(snapshot);

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    return snapshot.forEach((doc) => {
      return doc.data();
    });
  });
});
