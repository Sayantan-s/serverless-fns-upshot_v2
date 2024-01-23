import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const { SERVERLESS_PORT, NODE_ENV, OPENAI_API_KEY } = process.env;

export { NODE_ENV, OPENAI_API_KEY, SERVERLESS_PORT };
