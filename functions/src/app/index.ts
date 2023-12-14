import express, { Express, Request, Response } from "express";

export default class Server {
  private static getInstance: Express;
  private app: Express;
  constructor() {
    this.app = express();
    const port = process.env.PORT || 3000;
    this.app.get("/health", (req: Request, res: Response) => {
      res.status(200).send({ message: "Success" });
    });

    if (process.env.NODE_ENV === "development") {
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
