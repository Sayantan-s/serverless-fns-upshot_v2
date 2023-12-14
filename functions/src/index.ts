import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const generatePosts = functions.https.onRequest((request, response) => {
  // eslint-disable-next-line object-curly-spacing
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
