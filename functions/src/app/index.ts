import express, { Express, Request, Response } from "express";
import { NODE_ENV, PORT } from "../config";

export default class Server {
  private static getInstance: Express;
  private app: Express;
  constructor() {
    this.app = express();
    const port = PORT || 3000;
    this.app.get("/health", (req: Request, res: Response) => {
      res.status(200).send({ message: "Success" });
    });

    console.log(NODE_ENV);

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
