import "dotenv/config";

import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export const run = async () => {
  try {
    const loader = new PDFLoader(
      "docs/derechoshumanos_publicaciones_colecciondebolsillo_01_constitucion_nacion_argentina.pdf"
    );
    const rawDoc = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });
    const splittedDocs = await textSplitter.splitDocuments(rawDoc);
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY ?? "",
      environment: process.env.PINECONE_ENVIRONMENT ?? "",
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME ?? "");

    await PineconeStore.fromDocuments(splittedDocs, embeddings, {
      pineconeIndex: index,
      namespace: "test",
      textKey: "text",
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
};

(async () => {
  await run();
  console.log("ingestion complete");
})();
