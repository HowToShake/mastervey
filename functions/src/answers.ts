import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { cors } from "./index";
import { nanoid } from "nanoid";
import { flattenDeep } from "lodash";

export const saveAnswer = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { answer, question, meta } = req.body;

    const surveysRef = admin.firestore().collection("surveys");
    const snapshot = await surveysRef.where("name", "==", question).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return res.status(200).send([]);
    }

    const surveyRef = snapshot.docs[0].ref;

    const data = snapshot.docs.map((doc) => doc.data());

    const newAnswersArray = [
      ...(data?.[0]?.answers || []),
      { id: nanoid(), userAnswers: answer, ...meta },
    ];

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

    const userAnswers = flattenDeep(
      data?.[0]?.answers?.map((answer: any) => answer.userAnswers)
    );

    const result = {};
    userAnswers
      //  @ts-ignore
      ?.map(({ questionId, question, answers }) => {
        if (!question) {
          return;
        }
        //  @ts-ignore
        if (!result[questionId]) {
          //  @ts-ignore
          return (result[questionId] = {
            question,
            answers,
          });
        }
        //  @ts-ignore
        return (result[questionId] = {
          //  @ts-ignore
          ...result[questionId],
          //  @ts-ignore
          answers: [...result[questionId].answers, ...answers],
        });
      })
      .filter((x) => !!x);

    console.log("result", result);

    const total = {};

    for (const [key, value] of Object.entries(result)) {
      //  @ts-ignore
      const answers = value?.answers?.reduce((prev, curr) => {
        if (!prev[curr]) {
          prev[curr] = 1;
        } else {
          prev[curr] += 1;
        }
        return prev;
      }, {});

      //  @ts-ignore
      total[key] = {
        //  @ts-ignore
        question: value.question,
        answers,
      };
    }

    console.log("total", total);

    return res.status(200).send({
      answers: data?.[0]?.answers,
      total: total,
    });
  });
});

// export const getAnswer = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     const { question, answerId } = req.query;
//
//     const tokenId = req.get("Authorization")?.split("Bearer ")[1];
//
//     if (!tokenId || typeof tokenId === "undefined") {
//       res.status(403).send("Unauthorized");
//     }
//
//     const { uid } = await admin.auth().verifyIdToken(tokenId as string);
//
//     if (!uid) {
//       return res.status(403).send("Unauthorized");
//     }
//
//     const surveysRef = admin.firestore().collection("surveys");
//     const snapshot = await surveysRef.where("name", "==", question).get();
//
//     if (snapshot.empty) {
//       console.log("No matching documents.");
//       return res.status(200).send([]);
//     }
//
//     const data = snapshot.docs.map((doc) => doc.data());
//
//     console.log("data", data);
//
//     const answer = data?.[0]?.answers?.find(
//       (answer: { id: string }) => answer.id === answerId
//     );
//
//     console.log("answer", answer);
//
//     return res.status(200).send(answer);
//   });
// });
