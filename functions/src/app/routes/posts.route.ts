import { Router as router } from "express";
import { Posts } from "../controllers/posts";

const postsRouter = router();

postsRouter.route("/generate").post(Posts.generate);

export default postsRouter;
