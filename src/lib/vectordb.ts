import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_API_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

const missingAstraEnv =
  !process.env.ASTRA_DB_APPLICATION_TOKEN || !process.env.ASTRA_DB_ENDPOINT;

if (missingAstraEnv) {
  console.warn("Astra DB env vars not set. Vector search is disabled.");
}


export async function getVectorStore() {
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
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);

  return db.collection(collection);
}
