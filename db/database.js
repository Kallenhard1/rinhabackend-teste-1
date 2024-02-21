const { Client } = require("pg");

const client = new Client({
  host: "db",
  port: 5432,
  database: "rinhadb",
  user: "root",
  password: "1234",
});

async function query(queryObject) {
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

const pessoas = [
  { id: 1, name: "Maik" },
  { id: 2, name: "Natalia" },
  { id: 3, name: "Lucca" },
  { id: 4, name: "Wagner" },
  { id: 5, name: "Mario" },
];

module.exports = {
  query: query,
  pessoas: pessoas,
};
