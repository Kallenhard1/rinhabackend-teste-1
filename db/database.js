const { Client } = require("pg");

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER || "root",
    database: process.env.POSTGRES_DB || "rinhadb",
    password: process.env.POSTGRES_PASSWORD || "local_password",
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } finally {
    await client.end();
  }
}

module.exports = {
  query: query,
};
