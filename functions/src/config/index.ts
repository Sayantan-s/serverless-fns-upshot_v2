import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const { PORT, NODE_ENV, OPENAI_API_KEY } = process.env;

export { NODE_ENV, PORT, OPENAI_API_KEY };
