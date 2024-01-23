import express, { Express, Request, Response } from "express";
import { NODE_ENV, PORT} from "../config";
import {OpenApi} from "../config/openai";
import bodyParser from "body-parser";

interface FivePosts{
  title?: string,
  content?: string
}

export default class Server {
  private static getInstance: Express;
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    const port = PORT || 3000;

    this.app.post("/health", async (req: Request, res: Response) => {
      const {productName, productMoto}=req.body;
      const description = await OpenApi.client.chat.completions.create({
        messages: [{
          role: "system",
          content: `Generate a 50 words product description 
          according to the below inputs:
        productName: ${productName}
        productMoto: ${productMoto}`}],
        model: "gpt-3.5-turbo",
        stream: false,
        temperature: 0.2,
        max_tokens: 300,
      });
      console.log(description.choices[0].message.content);
      res
        .status(200)
        .send(description.choices[0].message.content);
    });

    this.app.post("/genpost", async (req: Request, res: Response) => {
      const {productName, productMoto}=req.body;
      const description = await OpenApi.client.chat.completions.create({
        messages: [{
          role: "system",
          content: `
          Write 5 social media posts about the product "${productName}" 
          with product motto "${productMoto}" 
          for Build in Public purpose.
          (Include emojis and Post)`,
        }],
        model: "gpt-3.5-turbo",
        stream: false,
        temperature: 0.1,
        max_tokens: 500,
      });
      const lines = description.choices[0].message.content
        ?.split("\n").filter((line)=>line.trim()!=="");
      console.log(lines);
      const fivePosts=[];
      lines?.forEach((val, index)=>{
        const temp:FivePosts = {};
        if (index%2==0) {
          temp["title"]=val;
        }
        if (index%2!=0) {
          temp["content"]=val;
        }
        fivePosts.push(temp);
      });
      res
        .status(200)
        .send(description.choices[0].message.content);
    });
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
