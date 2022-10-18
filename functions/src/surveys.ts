import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { cors } from "./index";

export const createSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const tokenId = req.get("Authorization")?.split("Bearer ")[1];
      const { name, isPublic } = req.body;

      if (!tokenId || typeof tokenId === "undefined") {
        res.status(403).send("Unauthorized");
      }

      const { uid } = await admin.auth().verifyIdToken(tokenId as string);

      const newSurvey = {
        userId: uid,
        create: [],
        answers: [],
        name,
        isPublic,
      };

      await admin.firestore().collection("surveys").doc().create(newSurvey);

      return res.status(200).send(newSurvey);
    } catch (e) {
      return res.status(500).send("There was an error during creating survey");
    }
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

    const data = snapshot.docs.map((doc) => doc.data());

    return res.status(200).send(data);
  });
});

export const saveSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];
    const { name, create } = req.body;

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    if (!uid) {
      return res.status(403).send("Unauthorized");
    }

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", name).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const surveyRef = snapshot.docs[0].ref;

    const update = admin
      .firestore()
      .collection("surveys")
      .doc(surveyRef.id)
      .update("create", create);

    return res.status(200).send(update);
  });
});

export const deleteSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];
    const { name } = req.query;

    if (!tokenId || typeof tokenId === "undefined") {
      res.status(403).send("Unauthorized");
    }

    const { uid } = await admin.auth().verifyIdToken(tokenId as string);

    if (!uid) {
      return res.status(403).send("Unauthorized");
    }

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", name).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const surveyRef = snapshot.docs[0].ref;

    const deletedSurvey = admin
      .firestore()
      .collection("surveys")
      .doc(surveyRef.id)
      .delete();

    return res.status(200).send(deletedSurvey);
  });
});

export const getSurvey = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { name } = req.query;

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", name).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const data = snapshot.docs.map((doc) => doc.data());

    return res.status(200).send(data[0]);
  });
});
