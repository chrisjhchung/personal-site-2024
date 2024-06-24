// client.ts
import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2023-05-03";
const token = import.meta.env.VITE_SANITY_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity project ID or dataset. Check your environment variables."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export default client;
