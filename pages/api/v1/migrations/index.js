import migrationRunner from 'node-pg-migrate';
import { join } from "node:path"
import database from "infra/database"

const migrations = async (request, response) => {
  const dbClient = await database.getNewClient()
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  }
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions)
    await dbClient.end();
    return response.status(200).json(pendingMigrations)
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    })
    
    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();

};

export default migrations;