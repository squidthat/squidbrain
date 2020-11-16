/**
 * Sets row level security on:
 * - Table.CIRCLES
 * - Table.FEDERATION_LINKS
 * - Table.LINKS
 * - Table.SQUIDS
 * - Table.USERS
 *
 * - Table.SQUIDS_IN_CIRCLES
 * - Table.USERS_IN_CIRCLES
 */
import { Table } from '../config';
import { getMigrators, Operation } from '../utils';

/**
 * Permission functions
 */
export const CREATE_PERMISSION_FUNCTIONS: Operation = {
  up: `
    -- Function: Checks whether the user can see the squid
    CREATE FUNCTION user_can_see_squid(squid_uuid UUID) RETURNS BOOLEAN AS
    $$
    SELECT EXISTS (
      SELECT 1 FROM ${Table.SQUIDS}
      WHERE ${Table.SQUIDS}.uuid = squid_uuid
    )
    $$ LANGUAGE SQL STABLE;

    -- Function: Checks whether the user is the owner of the squid
    CREATE FUNCTION user_is_squid_owner(squid_uuid UUID) RETURNS BOOLEAN AS
    $$
    SELECT EXISTS (
      SELECT 1 FROM ${Table.SQUIDS}
      WHERE ${Table.SQUIDS}.uuid = squid_uuid
        AND ${Table.SQUIDS}.owner_uuid = current_setting('jwt.claims.user_uuid', true)::uuid
    );
    $$ LANGUAGE SQL STABLE;

    -- Function: Checks whether the user is in the circle
    CREATE FUNCTION user_is_in_circle(circle_id UUID) RETURNS BOOLEAN AS
    $$
    SELECT EXISTS (
      SELECT 1 FROM ${Table.USERS_IN_CIRCLES}
      WHERE ${Table.USERS_IN_CIRCLES}.circle_uuid = circle_id
    );
    $$ LANGUAGE SQL STABLE;

    -- Function: Checks whether the user is an admin in the circle
    CREATE FUNCTION user_is_admin_in_circle(circle_id UUID) RETURNS BOOLEAN AS
    $$
    SELECT EXISTS (
      SELECT 1 FROM ${Table.USERS_IN_CIRCLES}
      WHERE ${Table.USERS_IN_CIRCLES}.circle_uuid = circle_id
        AND ${Table.USERS_IN_CIRCLES}.is_admin = true
    );
    $$ LANGUAGE SQL STABLE;
  `,
  down: `
    -- Drop all functions
    DROP FUNCTION user_can_see_squid;
    DROP FUNCTION user_is_squid_owner;
    DROP FUNCTION user_is_in_circle;
    DROP FUNCTION user_is_admin_in_circle;
  `,
};

/**
 * Creates Table.CIRCLES Policies
 */
export const CREATE_POLICIES__CIRCLES: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.CIRCLES} ENABLE ROW LEVEL SECURITY;

    -- Can see the circles you are in
    CREATE POLICY select_own_${Table.CIRCLES} ON ${Table.CIRCLES} FOR SELECT USING (user_is_in_circle(uuid));

    -- Can write the circles you in which you are admin
    CREATE POLICY delete_admin_${Table.CIRCLES} ON ${Table.CIRCLES} FOR DELETE USING (user_is_admin_in_circle(uuid));
    CREATE POLICY update_admin_${Table.CIRCLES} ON ${Table.CIRCLES} FOR UPDATE USING (user_is_admin_in_circle(uuid));
    CREATE POLICY insert_admin_${Table.CIRCLES} ON ${Table.CIRCLES} FOR INSERT WITH CHECK (user_is_admin_in_circle(uuid));
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.CIRCLES} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_own_${Table.CIRCLES} ON ${Table.CIRCLES};
    DROP POLICY delete_admin_${Table.CIRCLES} ON ${Table.CIRCLES};
    DROP POLICY update_admin_${Table.CIRCLES} ON ${Table.CIRCLES};
    DROP POLICY insert_admin_${Table.CIRCLES} ON ${Table.CIRCLES};
  `,
};

/**
 * Creates Table.CONTENTS Policies
 */
export const CREATE_POLICIES__CONTENTS: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.CONTENTS} ENABLE ROW LEVEL SECURITY;

    -- Can see link if you can see its squid
    CREATE POLICY select_${Table.CONTENTS} ON ${Table.CONTENTS} FOR SELECT USING (user_can_see_squid(squid_uuid));

    -- Can write in your own squids
    CREATE POLICY delete_own_${Table.CONTENTS} ON ${Table.CONTENTS} FOR DELETE USING (user_is_squid_owner(squid_uuid));
    CREATE POLICY update_own_${Table.CONTENTS} ON ${Table.CONTENTS} FOR UPDATE USING (user_is_squid_owner(squid_uuid));
    CREATE POLICY insert_own_${Table.CONTENTS} ON ${Table.CONTENTS} FOR INSERT WITH CHECK (user_is_squid_owner(squid_uuid));
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.CONTENTS} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_${Table.CONTENTS} ON ${Table.CONTENTS};
    DROP POLICY delete_own_${Table.CONTENTS} ON ${Table.CONTENTS};
    DROP POLICY update_own_${Table.CONTENTS} ON ${Table.CONTENTS};
    DROP POLICY insert_own_${Table.CONTENTS} ON ${Table.CONTENTS};
  `,
};

/**
 * Creates Table.FEDERATION_LINKS Policies
 */
export const CREATE_POLICIES__FEDERATION_LINKS: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.FEDERATION_LINKS} ENABLE ROW LEVEL SECURITY;

    -- Federation links are always public for now
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.FEDERATION_LINKS} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
  `,
};

/**
 * Creates Table.LINKS Policies
 */
export const CREATE_POLICIES__LINKS: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.LINKS} ENABLE ROW LEVEL SECURITY;

    -- Can see public links
    CREATE POLICY select_public_${Table.LINKS} ON ${Table.LINKS} FOR SELECT USING ( public is true );

    -- Can see link if you can see its squid
    CREATE POLICY select_own_${Table.LINKS} ON ${Table.LINKS} FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM ${Table.SQUIDS}
        WHERE ${Table.SQUIDS}.uuid = ${Table.LINKS}.origin_uuid
          OR ${Table.SQUIDS}.uuid = ${Table.LINKS}.destination_uuid
      )
    );
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.LINKS} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_public_${Table.LINKS} ON ${Table.LINKS};
    DROP POLICY select_own_${Table.LINKS} ON ${Table.LINKS};
  `,
};

/**
 * Creates Table.SQUIDS Policies
 */
export const CREATE_POLICIES__SQUIDS: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.SQUIDS} ENABLE ROW LEVEL SECURITY;

    -- Can see public squids
    CREATE POLICY select_public_${Table.SQUIDS} ON ${Table.SQUIDS} for SELECT USING ( public is true );

    -- Can see owned squids
    CREATE POLICY select_own_${Table.SQUIDS} ON ${Table.SQUIDS} FOR SELECT USING (
      ${Table.SQUIDS}.owner_uuid = current_setting('jwt.claims.user_uuid', true)::uuid
    );
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.SQUIDS} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_public_${Table.SQUIDS} ON ${Table.SQUIDS};
    DROP POLICY select_own_${Table.SQUIDS} ON ${Table.SQUIDS};
  `,
};

/**
 * Creates Table.USERS Policies
 */
export const CREATE_POLICIES__USERS: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.USERS} ENABLE ROW LEVEL SECURITY;

    -- Can only see yourself
    CREATE POLICY select_${Table.USERS} ON ${Table.USERS} FOR SELECT USING (
      ${Table.USERS}.uuid = current_setting('jwt.claims.user_uuid', true)::uuid
    );
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.USERS} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_${Table.USERS} ON ${Table.USERS};
  `,
};

export const CREATE_POLICIES__WIKIS: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.WIKIS} ENABLE ROW LEVEL SECURITY;

    -- Can see public wikis
    CREATE POLICY select_public_${Table.WIKIS} ON ${Table.WIKIS} FOR SELECT USING (
      ${Table.WIKIS}.public = true
    );

    -- Can see your own wikis
    CREATE POLICY select_own_${Table.WIKIS} ON ${Table.WIKIS} FOR SELECT USING (
      ${Table.WIKIS}.owner_uuid = current_setting('jwt.claims.user_uuid', true)::uuid
    );
  `,
  down: `
    -- Disable RLS
    ALTER TABLE ${Table.WIKIS} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_public_${Table.WIKIS} ON ${Table.WIKIS};
    DROP POLICY select_own_${Table.WIKIS} ON ${Table.WIKIS};
  `,
};

/**
 * Creates Table.SQUIDS_IN_CIRCLES Policies
 */
export const CREATE_POLICIES__SQUIDS_IN_CIRCLES: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.SQUIDS_IN_CIRCLES} ENABLE ROW LEVEL SECURITY;

    -- Can see the circles the squid is in if you can see the squid
    CREATE POLICY select_own_${Table.SQUIDS_IN_CIRCLES} ON ${Table.SQUIDS_IN_CIRCLES} FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM ${Table.SQUIDS}
        WHERE ${Table.SQUIDS}.uuid = ${Table.SQUIDS_IN_CIRCLES}.squid_uuid
      )
    );
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.SQUIDS_IN_CIRCLES} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_own_${Table.SQUIDS_IN_CIRCLES} ON ${Table.SQUIDS_IN_CIRCLES};
  `,
};

/**
 * Creates Table.USERS_IN_CIRCLES Policies
 */
export const CREATE_POLICIES__USERS_IN_CIRCLES: Operation = {
  up: `
    -- Enable RLS
    ALTER TABLE ${Table.USERS_IN_CIRCLES} ENABLE ROW LEVEL SECURITY;

    -- Can see the circles you are in
    CREATE POLICY select_${Table.USERS_IN_CIRCLES} ON ${Table.USERS_IN_CIRCLES} FOR SELECT USING (
      ${Table.USERS_IN_CIRCLES}.user_uuid = current_setting('jwt.claims.user_uuid', true)::uuid
    );
  `,

  down: `
    -- Disable RLS
    ALTER TABLE ${Table.USERS_IN_CIRCLES} DISABLE ROW LEVEL SECURITY;

    -- Drop all policies
    DROP POLICY select_${Table.USERS_IN_CIRCLES} ON ${Table.USERS_IN_CIRCLES};
  `,
};

/**
 * Knex migrations
 */
export const { up, down } = getMigrators([
  // Permission functions
  CREATE_PERMISSION_FUNCTIONS,

  // Policies
  CREATE_POLICIES__USERS,
  CREATE_POLICIES__SQUIDS,
  CREATE_POLICIES__USERS_IN_CIRCLES,
  CREATE_POLICIES__SQUIDS_IN_CIRCLES,
  CREATE_POLICIES__CIRCLES,
  CREATE_POLICIES__CONTENTS,
  CREATE_POLICIES__LINKS,
  CREATE_POLICIES__FEDERATION_LINKS,
  CREATE_POLICIES__WIKIS,
]);
