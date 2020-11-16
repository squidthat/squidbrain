// Update with your config settings.
import { config } from 'dotenv';

config();

/**
 * Creates a Knex environment
 *
 * @param overrides
 */
const createEnvironment = (overrides: Record<string, unknown> = {}) => ({
  client: 'postgresql',
  connection: {
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './src/db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
  ...overrides,
});

export const development = createEnvironment();

export const staging = createEnvironment();

export const production = createEnvironment();
