import * as functions from "firebase-functions";
import Server from "./app";

export const generatePosts = functions.https.onRequest(Server.instance);
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
