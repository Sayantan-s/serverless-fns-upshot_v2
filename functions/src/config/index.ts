import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const {
  SERVERLESS_PORT,
  NODE_ENV,
  OPENAI_API_KEY,
  GEN_POSTS_TEST_KEY,
  API_KEY,
} = process.env;

export {
  API_KEY,
  GEN_POSTS_TEST_KEY,
  NODE_ENV,
  OPENAI_API_KEY,
  SERVERLESS_PORT,
};
