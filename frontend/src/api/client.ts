// client.ts
import sanityClient from "@sanity/client";

console.log(import.meta.env.VITE_SANITY_HOST);

export default sanityClient({
  projectId: "chrisjhchung", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
});
