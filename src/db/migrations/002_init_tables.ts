/**
 * Creates the initial tables:
 * - Table.CIRCLES
 * - Table.FEDERATION_LINKS
 * - Table.LINKS
 * - Table.SQUIDS
 * - Table.USERS
 *
 * - Table.SQUIDS_IN_CIRCLES
 * - Table.USERS_IN_CIRCLES
 *
 * Grants privileges to the app user
 */
import { Table } from '../config';
import { getMigrators, Operation } from '../utils';

/**
 * Creates Table.CIRCLES
 */
export const CREATE_TABLE__CIRCLES: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.CIRCLES} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.CIRCLES};
  `,
};

/**
 * Creates Table.CONTENTS
 */
export const CREATE_TABLE__CONTENT: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.CONTENTS} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      squid_uuid UUID NOT NULL REFERENCES ${Table.SQUIDS},
      type VARCHAR(64) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.CONTENTS};
  `,
};


/**
 * Creates Table.FEDERATION_LINKS
 */
export const CREATE_TABLE__FEDERATION_LINKS: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.FEDERATION_LINKS} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      squid_uuid UUID NOT NULL REFERENCES ${Table.SQUIDS},
      host TEXT NOT NULL,
      target UUID NOT NULL,
      type VARCHAR CHECK (type IN ('ORIGIN', 'DESTINATION')),
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.FEDERATION_LINKS};
  `,
};

/**
 * Creates Table.LINKS
 */
export const CREATE_TABLE__LINKS: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.LINKS} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      description TEXT NOT NULL default '',
      owner_uuid UUID NOT NULL REFERENCES ${Table.USERS},
      origin_uuid UUID NOT NULL REFERENCES ${Table.SQUIDS},
      destination_uuid UUID NOT NULL REFERENCES ${Table.SQUIDS},
      public BOOLEAN DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.LINKS};
  `,
};

/**
 * Creates Table.SQUIDS
 */
export const CREATE_TABLE__SQUIDS: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.SQUIDS} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      owner_uuid UUID NOT NULL REFERENCES ${Table.USERS},
      title VARCHAR(255) NOT NULL,
      layout TEXT NOT NULL DEFAULT '',
      public BOOLEAN DEFAULT false,
      allow_external_links VARCHAR CHECK (allow_external_links IN ('YES', 'NO', 'REQUIRE_APPROVAL')) DEFAULT 'NO',
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.SQUIDS};
  `,
};

/**
 * Creates Table.USERS
 */
export const CREATE_TABLE__USERS: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.USERS} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL DEFAULT '',
      email citext UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      active BOOLEAN DEFAULT true,
      verified BOOLEAN DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );

    -- Create hashing function
    CREATE FUNCTION hash_user_password() RETURNS TRIGGER AS
    $$
    BEGIN
      NEW.password = crypt(NEW.password, gen_salt('bf'));
      RETURN NEW;
    END;
    $$ LANGUAGE PLPGSQL;

    -- Create user uuid function
    CREATE FUNCTION user_uuid() RETURNS UUID AS
    $$
      SELECT NULLIF(current_setting('jwt.claims.user_uuid', true), '')::uuid;
    $$ LANGUAGE SQL STABLE;

    -- Trigger hashing function on insert
    CREATE TRIGGER trigger_hash_user_password_on_insert
      BEFORE INSERT
      ON ${Table.USERS}
      FOR EACH ROW
      EXECUTE PROCEDURE hash_user_password();

    -- Trigger hashing function on update
    CREATE TRIGGER trigger_hash_user_password_on_update
      BEFORE UPDATE
      ON ${Table.USERS}
      FOR EACH ROW
      EXECUTE PROCEDURE hash_user_password();
  `,
  down: `
    -- Drop triggers
    DROP TRIGGER trigger_hash_user_password_on_insert ON ${Table.USERS};
    DROP TRIGGER trigger_hash_user_password_on_update ON ${Table.USERS};

    -- Drop functions
    DROP FUNCTION hash_user_password;
    DROP FUNCTION user_uuid;

    -- Drop table
    DROP TABLE ${Table.USERS};
  `,
};

/**
 * Creates Table.WIKIS
 */
export const CREATE_TABLE__WIKIS: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.WIKIS} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      owner_uuid UUID NOT NULL REFERENCES ${Table.USERS},
      description TEXT NOT NULL DEFAULT '',
      public BOOLEAN DEFAULT false
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.WIKIS};
  `,
};

/**
 * Creates M2M Table.SQUIDS_IN_CIRCLES
 */
export const CREATE_M2M_TABLE__SQUIDS_IN_CIRCLES: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.SQUIDS_IN_CIRCLES} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      circle_uuid UUID NOT NULL REFERENCES ${Table.CIRCLES},
      squid_uuid UUID NOT NULL REFERENCES ${Table.SQUIDS}
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.SQUIDS_IN_CIRCLES};
  `,
};

/**
 * Creates M2M Table.USERS_IN_CIRCLES
 */
export const CREATE_M2M_TABLE__USERS_IN_CIRCLES: Operation = {
  up: `
    -- Create table
    CREATE TABLE ${Table.USERS_IN_CIRCLES} (
      uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      circle_uuid UUID NOT NULL REFERENCES ${Table.CIRCLES},
      user_uuid UUID NOT NULL REFERENCES ${Table.USERS},
      is_admin BOOLEAN DEFAULT false
    );
  `,
  down: `
    -- Drop table
    DROP TABLE ${Table.USERS_IN_CIRCLES};
  `,
};

/**
 * Grants privileges
 */
export const GRANT_PRIVILEGES: Operation = {
  up: `
    -- Grant all privileges to the app user
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${process.env.POSTGRES_APP_USER};
  `,
  down: `
    -- Revoke all privileges to the app user
    REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM ${process.env.POSTGRES_APP_USER};
  `,
};


/**
 * Knex migrations
 */
export const { up, down } = getMigrators([
  // Create tables
  CREATE_TABLE__USERS,
  CREATE_TABLE__CIRCLES,
  CREATE_TABLE__SQUIDS,
  CREATE_TABLE__CONTENT,
  CREATE_TABLE__LINKS,
  CREATE_TABLE__FEDERATION_LINKS,
  CREATE_TABLE__WIKIS,

  // Create Many to Many tables
  CREATE_M2M_TABLE__SQUIDS_IN_CIRCLES,
  CREATE_M2M_TABLE__USERS_IN_CIRCLES,

  // Grant Privileges
  GRANT_PRIVILEGES,
]);
