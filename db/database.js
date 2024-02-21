const pessoas = [
  { id: 1, name: "Maik" },
  { id: 2, name: "Natalia" },
  { id: 3, name: "Lucca" },
  { id: 4, name: "Wagner" },
  { id: 5, name: "Mario" },
];

import { Client } from "pg";

async function query(queryObject) {
  const client = new Client();
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
  pessoas: pessoas,
};
