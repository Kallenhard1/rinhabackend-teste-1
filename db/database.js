const { Client } = require("pg");

async function query(queryObject) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "root",
    database: "rinhadb",
    password: "local_password",
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
