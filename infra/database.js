import { Client } from "pg";

async function query(queryObject) {
  const credenciaisDatabase = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  };

  const client = new Client(credenciaisDatabase);

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

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV !== "development" ? true : false;
}

export default {
  query: query,
};
