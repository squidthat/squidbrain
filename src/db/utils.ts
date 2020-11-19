import * as Knex from 'knex';

import { Table } from './config';

/**
 * Abstracts a couple of SQLs.
 * The first SQL represents the forward migration,
 * the second SQL represents the rollback migration,
 */
export interface Operation {
  up: string;
  down: string;
}

/**
 * Represents a constraint field
 * composed by a table name and one of its fields.
 * The field should default to 'uuid'.
 */
export type Constraint = [Table, string?];

/**
 * Represents the migration functions
 * required by each Knex migration file.
 */
export interface Migrators {
  up: (knex: Knex) => Promise<void>,
  down: (knex: Knex) => Promise<void>,
}


/**
 * Generates the SQL for a PK Constraint
 *
 * @param origin
 */
export const pk = (origin: Constraint): string => `
  CONSTRAINT pk_${origin[0]}_${origin[1] || 'uuid'}
    PRIMARY KEY (${origin[1] || 'uuid'})
`;

/**
 * Generates the SQL for a FK Contraint
 *
 * @param origin
 * @param destination
 */
export const fk = (origin: Required<Constraint>, destination: Constraint): string => `
  CONSTRAINT fk_${origin[0]}_${origin[1]}_to_${destination[0]}_${destination[1] || 'uuid'}
    FOREIGN KEY (${origin[1]})
      REFERENCES ${destination[0]}(${destination[1] || 'uuid'})
`;

export const printSql = (prefix: string, sql: string): string => `
===================
${prefix}:

${sql}
===================
`;

/**
 * Generates the migration functions
 * required by each Knex migration file.
 * @param operations
 */
export const getMigrators = (operations: Operation[]): Migrators => {
  const up = async (knex: Knex): Promise<void> => {
    for await (const operation of operations) {
      printSql('Executing forward migration', operation.up);
      await knex.raw(operation.up);
    }
  };

  const down = async (knex: Knex): Promise<void> => {
    for await (const operation of operations.reverse()) {
      printSql('Executing rollback migration', operation.down);
      await knex.raw(operation.down);
    }
  };

  return {
    up,
    down,
  };
};
