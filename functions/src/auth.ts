import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { cors } from "./index";

export const signup = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { email, password } = request.body;

    console.log("email Function", email, password);

    const { uid } = await admin.auth().createUser({
      email,
      password,
    });

    response.send(uid);
  });
});
