import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { cors } from "./index";

export const saveAnswer = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { answer, question } = req.body;

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", question).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const surveyRef = snapshot.docs[0].ref;

    const data = snapshot.docs.map((doc) => doc.data());

    const newAnswersArray = [...data?.[0]?.answers, ...answer];

    const update = admin
      .firestore()
      .collection("surveys")
      .doc(surveyRef.id)
      .update("answers", newAnswersArray);

    return res.status(200).send(update);
  });
});

export const getAnswers = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { question } = req.query;

    const tokenId = req.get("Authorization")?.split("Bearer ")[1];

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    if (!uid) {
      return res.status(403).send("Unauthorized");
    }

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", question).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const data = snapshot.docs.map((doc) => doc.data());

    return res.status(200).send(data?.[0]?.answers);
  });
});
