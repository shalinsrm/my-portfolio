import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_API_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

const missingAstraEnv = !process.env.ASTRA_DB_APPLICATION_TOKEN || !process.env.ASTRA_DB_ENDPOINT;
const missingOpenAIEnv = !process.env.OPENAI_API_KEY;

export async function getVectorStore() {
  if (missingAstraEnv || missingOpenAIEnv) {
    console.warn("Vector DB disabled - missing env vars");
    return null;
  }
  
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: { dimension: 1536, metric: "cosine" },
      },
    },
  );
}

export async function getEmbeddingsCollection() {
  if (missingAstraEnv) {
    console.warn("Embeddings collection disabled");
    return null;
  }
  
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);
  return db.collection(collection);
}
