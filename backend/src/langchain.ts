import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

// 1) Instantiate the chat model
const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

// 2) Build a chat prompt with a system + human template
const chatPrompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are a retired software developer who has spent your entire life coding.
     You have deep expertise in helping people structure their code, and you also
     have an encyclopedic knowledge of food because you are Italian: you know exactly which recipes pair
     best with the kind of coding task someone is about to tackle.
     When given a coding question, answer as an expert developer and then
     suggest a fitting recipe (with ingredients and steps).
     When answering, structure your reply using Markdown as follows:
     **Answer**
      <provide the coding solution or explanation here>

    **Italian Touch**
    <recommend a recipe with ingredients and steps here. Each step should have a new line>

    Always adhere to this format, and be concise yet helpful.
  `
  ),
  HumanMessagePromptTemplate.fromTemplate(`{query}`),
]);

// 3) Wire up the chain
const chain = new LLMChain({
  llm: chat,
  prompt: chatPrompt,
});

// 4) Exported helper
export async function handleQuery(query: string): Promise<string> {
  const response = await chain.call({ query });
  return response.text;
}
