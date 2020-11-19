/**
 * Initialises PostgreSQL:
 * - Enables all required extensions
 * - Creates database roles
 */
import { getMigrators, Operation } from '../utils';


/**
 * Enables the extensions
 */
export const CREATE_EXTENSIONS: Operation = {
  up: `
    CREATE EXTENSION "pgcrypto";
    CREATE EXTENSION "citext";
  `,
  down: `
    DROP EXTENSION "citext";
    DROP EXTENSION "pgcrypto";
  `,
};

/**
 * Creates the database roles
 */
export const CREATE_ROLES = {
  up: `
    CREATE USER
      ${process.env.POSTGRES_APP_USER}
      WITH PASSWORD '${process.env.POSTGRES_APP_PASSWORD}';
  `,
  down: `
    DROP USER ${process.env.POSTGRES_APP_USER};
  `,
};

/**
 * Knex migrations
 */
export const { up, down } = getMigrators([
  CREATE_EXTENSIONS,
  CREATE_ROLES,
]);
