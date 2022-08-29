import algoliasearch from "algoliasearch";

const client = algoliasearch("HDJQ3FYYOK", "5562ce219f239f0517c7f6f0dda4a820");
export const productIndex = client.initIndex("productosDos");
