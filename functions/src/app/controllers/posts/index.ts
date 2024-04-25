import { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuid } from "uuid";
// import { GEN_POSTS_TEST_KEY } from "../../../config";
import { OpenApi } from "../../../config/openai";
import { GeneratedPosts } from "./type";

export class Posts {
  public static generate = async (req: Request, res: Response) => {
    const { productName, productMoto, n=5 } = req.body;
    let retryLoopEnder = false;
    let tryAgain = true;
    while (tryAgain) {
      try {
        const description = await OpenApi.client.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `
            Write ${n} social media posts about the product "${productName}" 
            and its product motto is "${productMoto}" 
            for Build in Public purpose for Twitter/X. 
            Note: Include very intuitive Post Titles , Nice Post Descriptions 
            & emojis .
            `,
            },
          ],
          model: "gpt-3.5-turbo",
          stream: false,
          temperature: 0.4,
          max_tokens: 500,
        });
        // console.log(description.choices[0].message.content);

        const lines = description.choices[0].message.content
          ?.split("\n")
          .filter((line) => line?.trim() !== "");

        const generatedPosts: GeneratedPosts[] = [];

        for (let i = 0; i <= (n*2-2); i = i + 2) {
          const temp: GeneratedPosts = {};
          temp.id = uuid();
          temp.title = lines?.[i].substring(1).replace(". Post Title: ", "");
          temp.content = lines?.[i + 1].
            trimStart().replace("Description: ", "");
          generatedPosts.push(temp);
        }
        console.log(generatedPosts);
        tryAgain = false;
        res.status(201).send(generatedPosts);
      } catch (error: any) {
        console.log(error);
        if ((error.status==429 ||
           error.code==="insufficient_quota")&& !retryLoopEnder) {
          console.log("===============");
          console.log("Retrying.....");
          console.log("===============");
          retryLoopEnder= true;
        } else {
          tryAgain = false;
          // Mock Data Sending
          const directory = path.resolve(
            __dirname,
            "../../../..",
            "mocks",
            "data.json"
          );
          const readMockFile = await fs.readFile(directory, {
            encoding: "utf-8",
          });
          const finalJson = JSON.parse(readMockFile);
          res.status(201).send(finalJson);
        }
      }
    }

    //   const isTestMode = req.headers["x-test-key"] === GEN_POSTS_TEST_KEY;
    //   if (isTestMode) {
    //     const directory = path.resolve(
    //       __dirname,
    //       "../../../..",
    //       "mocks",
    //       "data.json"
    //     );
    //     const readMockFile = await fs.readFile(directory, {
    //       encoding: "utf-8",
    //     });
    //     const finalJson = JSON.parse(readMockFile);
    //     res.status(201).send(finalJson);
    //   } else {
    //     const description = await OpenApi.client.chat.completions.create({
    //       messages: [
    //         {
    //           role: "system",
    //           content: `
    //         Write 5 social media posts about the product "${productName}"
    //         and its product motto is "${productMoto}"
    //         for Build in Public purpose for Twitter/X.
    //         Note: Include very intuitive Post Titles , Nice Post Descriptions
    //         & emojis .
    //         `,
    //         },
    //       ],
    //       model: "gpt-3.5-turbo",
    //       stream: false,
    //       temperature: 0.4,
    //       max_tokens: 500,
    //     });
    //     // console.log(description.choices[0].message.content);

    //     const lines = description.choices[0].message.content
    //       ?.split("\n")
    //       .filter((line) => line?.trim() !== "");

    //     const generatedPosts: GeneratedPosts[] = [];

  //     for (let i = 0; i <= 8; i = i + 2) {
  //       const temp: GeneratedPosts = {};
  //       temp.id = uuid();
  //       temp.title = lines?.[i].substring(1).replace(". Post Title: ", "");
  //       temp.content = lines?.[i + 1].
  //       trimStart().replace("Description: ", "");
  //       generatedPosts.push(temp);
  //     }
  //     console.log(generatedPosts);
  //     res.status(201).send(generatedPosts);
  //   }
  // };
  };
}
