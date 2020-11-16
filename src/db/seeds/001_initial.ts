import * as Knex from 'knex';

import { Table } from '../config';
import { VALID_CIRCLES } from '../mocks/circles';
import { VALID_CONTENTS } from '../mocks/contents';
import { VALID_FEDERATION_LINKS } from '../mocks/federation_links';
import { VALID_LINKS } from '../mocks/links';
import { VALID_SQUIDS } from '../mocks/squids';
import { VALID_SQUIDS_IN_CIRCLES } from '../mocks/squids_in_circles';
import { VALID_USERS } from '../mocks/users';
import { VALID_USERS_IN_CIRCLES } from '../mocks/users_in_circles';
import { VALID_WIKIS } from '../mocks/wikis';

export const operations = [
  { table: Table.USERS, mocks: VALID_USERS },
  { table: Table.CIRCLES, mocks: VALID_CIRCLES },
  { table: Table.SQUIDS, mocks: VALID_SQUIDS },
  { table: Table.CONTENTS, mocks: VALID_CONTENTS },
  { table: Table.LINKS, mocks: VALID_LINKS },
  { table: Table.FEDERATION_LINKS, mocks: VALID_FEDERATION_LINKS },
  { table: Table.SQUIDS_IN_CIRCLES, mocks: VALID_SQUIDS_IN_CIRCLES },
  { table: Table.USERS_IN_CIRCLES, mocks: VALID_USERS_IN_CIRCLES },
  { table: Table.WIKIS, mocks: VALID_WIKIS },
];

/**
 * Seeds with basic rows
 * @param knex
 */
export const seed = async (knex: Knex): Promise<void> => {
  for await (const operation of operations.reverse()) {
    console.log(`Dropping: '${operation.table}'`);

    await knex(operation.table).del();
  }

  for await (const operation of operations.reverse()) {
    const rows = Object.values(operation.mocks);
    console.log(`Adding ${rows.length} rows to: '${operation.table}'`);

    await knex(operation.table).insert(rows);
  }
};
