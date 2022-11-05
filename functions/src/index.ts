import * as admin from "firebase-admin";
import { signup } from "./auth";
import {
  createSurvey,
  getSurvey,
  deleteSurvey,
  saveSurvey,
  getSurveys,
  getHashedSurvey,
} from "./surveys";
import { getAnswers, getCSVAnswers, saveAnswer } from "./answers";

export const cors = require("cors")({ origin: true });

admin.initializeApp();

admin.firestore().settings({ ignoreUndefinedProperties: true });
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export {
  signup,
  createSurvey,
  getSurvey,
  getHashedSurvey,
  deleteSurvey,
  saveSurvey,
  getSurveys,
  getAnswers,
  saveAnswer,
  getCSVAnswers,
};
