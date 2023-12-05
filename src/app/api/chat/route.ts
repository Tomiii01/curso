import { Pinecone } from "@pinecone-database/pinecone";
import { LangChainStream, StreamingTextResponse } from "ai";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { messages, token, configuration } = json;
  const message = messages[messages.length - 1].content;

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
    environment: process.env.PINECONE_ENVIRONMENT ?? "",
  });

  const pineconeIndex = pinecone.Index("llm-class");

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  vectorStore.namespace = "test";

  /* DEBUG: Search the vector DB */
  /*
  const results = await vectorStore.similaritySearch("Hermanos", 4);
  console.log(results);
  */

  const { stream, handlers } = LangChainStream();
  const model = new OpenAI({
    verbose: true, // for debug
    streaming: true,
    temperature: configuration.temperature,
    maxTokens: configuration.maxLenght,
    frequencyPenalty: configuration.frequencyPenalty,
    presencePenalty: configuration.presencePenalty,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 4,
    returnSourceDocuments: true,
  });

  const result = chain
    .call(
      {
        query: message,
      },
      [handlers]
    )
    .catch(console.error);
  console.log(result);

  return new StreamingTextResponse(stream);
}
