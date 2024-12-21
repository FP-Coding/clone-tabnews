import database from "infra/database.js";

const status = async (request, response) => {
  const updatedAt = new Date().toISOString();
  const { rows: versionInfo } = await database.query("SELECT * FROM pg_settings WHERE name = 'server_version'");
  const { rows: maxConnectionsInfo } = await database.query("SELECT * FROM pg_settings WHERE name ='max_connections'");
  const { rows: openedConnectionsInfo } = await database.query("SELECT COUNT(*) FROM pg_stat_activity WHERE datname='local_db'");

  const { setting: version } = versionInfo[0];
  const { setting: maxConnections } = maxConnectionsInfo[0];
  const { count: openedConnections } = openedConnectionsInfo[0];
  

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: parseInt(maxConnections),
        opened_connections: parseInt(openedConnections),
      }
    }
  });
};

export default status;
