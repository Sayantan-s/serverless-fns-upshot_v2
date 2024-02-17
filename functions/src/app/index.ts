import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { NODE_ENV, SERVERLESS_PORT } from "../config";
import Controllers from "./controllers";

export default class Server {
  private static getInstance: Express;
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    const port = SERVERLESS_PORT || 3000;

    this.app.post("/health", async (req: Request, res: Response) => {
      res.status(200).send({ message: "up and running" });
    });

    Controllers.restControllers(this.app);

    if (NODE_ENV === "development") {
      this.app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });
    }
  }

  static get instance() {
    if (!Server.getInstance) {
      const server = new Server();
      Server.getInstance = server.app;
    }
    return Server.getInstance;
  }
}
