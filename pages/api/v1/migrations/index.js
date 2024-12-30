import migrationRunner from 'node-pg-migrate';
import { join } from "node:path"
import database from "infra/database"

const migrations = async (request, response) => {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} not allowed`
    })
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();
  
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
      return response.status(200).json(pendingMigrations)
    }
  
    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      })
      
      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
  
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
      console.error(error)
      throw error;
  } finally {
      dbClient.end();
  }
};

export default migrations;
