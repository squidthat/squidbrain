#!/usr/bin/env -S npx ts-node
import { createServer } from 'http';

import { config as dotenv } from 'dotenv';
import Koa = require('koa');
import { postgraphile } from 'postgraphile';

dotenv();

const databaseUrl = `postgres://${process.env.POSTGRES_APP_USER}:${process.env.POSTGRES_APP_PASSWORD}@${process.env.POSTGRES_HOSTNAME}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const initPostgraphile = async () => {
  const schemaName = 'public';
  const options = {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    extendedErrors: ['hint', 'detail', 'errcode'],
    exportGqlSchemaPath: 'schema.graphql',
    graphiql: true,
    enhanceGraphiql: true,
    enableQueryBatching: true,
  };

  return postgraphile(databaseUrl, schemaName, options);
};


const init = async () => {
  const app = new Koa();

  app.use(await initPostgraphile());

  const server = createServer(app.callback());

  server.listen(8080, () => {
    const address = server.address();
    if (typeof address !== 'string') {
      const href = 'http://localhost:8080/graphiql';
      console.log(`PostGraphiQL available at ${href} 🚀`);
    } else {
      console.log(`PostGraphile listening on ${address} 🚀`);
    }
  });
};

init();
