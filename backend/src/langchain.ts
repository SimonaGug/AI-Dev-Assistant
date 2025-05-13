import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Initialize the OpenAI model with your API key
const openai = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

// Simple prompt template that forwards the user's query
const prompt = ChatPromptTemplate.fromTemplate("{query}");

// Create the chain with the model and prompt
const chain = new LLMChain({ llm: openai, prompt });

// handleQuery runs the chain with the provided query and returns the generated text
export async function handleQuery(query: string): Promise<string> {
  // run takes an object matching the prompt variables
  const response = await chain.call({ query });
  return response.text;
}
