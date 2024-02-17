import { Express } from "express";
import postsRouter from "../routes/posts.route";

export default class Controllers {
  static restControllers(app: Express) {
    app.use("/api/v1/posts", postsRouter);
  }
}
