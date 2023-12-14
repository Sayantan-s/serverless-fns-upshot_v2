import express, { Express, Request, Response } from "express";
import * as functions from "firebase-functions";

const app: Express = express();
// const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Success" });
});

if (process.env.NODE_ENV === "development") {
  app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:${3000}`);
  });
}

export const generatePosts = functions.https.onRequest(app);
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
