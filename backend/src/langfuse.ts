import "dotenv/config";
import { Langfuse } from "langfuse";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { v4 as uuidv4 } from "uuid";

const {
  OPENAI_API_KEY,
  LANGFUSE_PUBLIC_KEY,
  LANGFUSE_SECRET_KEY,
  LANGFUSE_BASEURL,
  LANGFUSE_PROJECT_ID,
} = process.env;

if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
if (!LANGFUSE_PUBLIC_KEY) throw new Error("Missing LANGFUSE_PUBLIC_KEY");
if (!LANGFUSE_SECRET_KEY) throw new Error("Missing LANGFUSE_SECRET_KEY");
if (!LANGFUSE_BASEURL) throw new Error("Missing LANGFUSE_BASEURL");
if (!LANGFUSE_PROJECT_ID) throw new Error("Missing LANGFUSE_PROJECT_ID");

//Initialize the Langfuse client
const lf = new Langfuse({
  publicKey: LANGFUSE_PUBLIC_KEY,
  secretKey: LANGFUSE_SECRET_KEY,
  baseUrl: LANGFUSE_BASEURL,
});

//Instantiate ChatOpenAI once
const chat = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });

export async function handleQuery(query: string): Promise<string> {
  const run = lf.trace({
    name: "expert-italian-session",
    sessionId: uuidv4(),
  });

  const promptClient = await lf.getPrompt("system_prompt");
  const systemTemplate = promptClient.prompt;

  const promptHuman = await lf.getPrompt("human_prompt");
  const humanTemplate = promptHuman.prompt;

  //Create a generation span, passing the prompt object
  //This links the generation to the exact prompt version
  const gen = run.generation({
    name: "expert-italian-generation",
    model: "openai-chat",
    modelParameters: {}, //{ temperature: 0.7 }
    prompt: promptClient,
    input: { query },
  });

  const chatPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(systemTemplate),
    HumanMessagePromptTemplate.fromTemplate(humanTemplate),
  ]);
  const chain = new LLMChain({ llm: chat, prompt: chatPrompt });
  const result = await chain.call({ query });

  //End the generation span (logs the output)
  gen.end({ output: result.text });

  //Flush any pending events to Langfuse
  await lf.shutdownAsync();

  return result.text;
}
