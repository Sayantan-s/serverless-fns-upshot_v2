import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { OpenApi } from "../../../config/openai";
import { FivePosts } from "./type";

export class Posts {
  public static generate = async (req: Request, res: Response) => {
    const { productName, productMoto } = req.body;

    const description = await OpenApi.client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          Write 5 social media posts about the product "${productName}" 
          and its product moto is "${productMoto}" 
          for Build in Public purpose for twitter.
          
          Your response schema should be similar to this::
          
          Title: Build, deploy, and scale your databases 
                 effortlessly with Render! 💻 #BuildInPublic

          Conent: Render makes database deployment a breeze! 
                Whether you're a solo developer or part of a team, 
                Render's platform simplifies the process so 
                you can focus on what matters most - building great products! 
                #Render #DatabasePlatform       
                    
          `,
        },
      ],
      model: "gpt-3.5-turbo",
      stream: false,
      temperature: 0.1,
      max_tokens: 500,
    });

    const lines = description.choices[0].message.content
      ?.split("\n")
      .filter((line) => line?.trim() !== "");

    const fivePosts: FivePosts[] = [];

    for (let i = 0; i <= 8; i = i + 2) {
      const temp: FivePosts = {};
      temp.id = uuid();
      temp.title = lines?.[i].replace(" Post Title: ", "");
      temp.content = lines?.[i + 1].replace("   Post Content: ", "");
      fivePosts.push(temp);
    }

    res.status(200).send(fivePosts);
  };
}
