import axios from "axios";
import { GPT_API_KEY } from "@env";

// chatgpt API에 질문하고 답변 받기
export const callChatGPT = async (
  chatList: {
    role: string;
    content: string;
  }[]
) => {
  console.log("call GPT");
  return axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "It presents two opinions in a balanced way when it is difficult for users to make decisions, and acts as a helper to analyze humorous reasons and various options in a random selection tool. Give neutral and logical advice on both options. In addition, after analyzing and explaining the pros and cons of each choice, attach your choice as well. Help users make choices while also presenting reasons for being fun and creative. You must answer in Korean, which can be up to 400 characters long.",
        },
        ...chatList,
      ],
      temperature: 0.5,
      max_tokens: 400,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GPT_API_KEY}`,
      },
    }
  );
};
