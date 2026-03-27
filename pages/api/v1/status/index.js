import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const resultVersion = await database.query("SHOW server_version;");
  const version = resultVersion.rows[0].server_version;

  const resultMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = resultMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const resultOpenedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });
  const openedConnections = resultOpenedConnections.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        version,
        max_connections: Number(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
