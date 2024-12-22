import database from "infra/database.js";

const status = async (request, response) => {
  const updatedAt = new Date().toISOString();
  const {
    rows: [{ server_version: versionValue }],
  } = await database.query("SHOW server_version;");

  const {
    rows: [{ max_connections: maxConnectionsValue }],
  } = await database.query("SHOW max_connections;");

  const { POSTGRES_DB: databaseName } = process.env;

  const {
    rows: [{ opened_connections: openedConnectionsValue }],
  } = await database.query({
    text: "SELECT COUNT(*)::int as opened_connections FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: openedConnectionsValue,
      },
    },
  });
};

export default status;
