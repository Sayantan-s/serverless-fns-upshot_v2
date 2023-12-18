import { OPENAI_API_KEY } from "../config/index";
import OpenAI from "openai";

export class OpenApi {
  private instance: OpenAI;
  private static clientInstance: OpenAI | null;
  constructor() {
    this.instance = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }
  static get client() {
    if (!OpenApi.clientInstance) {
      OpenApi.clientInstance = new OpenApi().instance;
    }
    return OpenApi.clientInstance;
  }
}
