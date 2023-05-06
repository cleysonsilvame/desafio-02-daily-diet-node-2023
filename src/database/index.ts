import { knex as setupKnex, Knex } from "knex";
import { env } from "../@env";

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
  debug: env.DEBUG,
};

export const knex = setupKnex(config);