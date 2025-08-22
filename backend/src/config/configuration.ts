import * as process from 'node:process';

import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: Number(process.env.APP_PORT || 5000),
    host: process.env.APP_HOST || 'localhost',
    appUrl: process.env.APP_URL || 'http://localhost:3000',
  },
  postgres: {
    port: Number(process.env.POSTGRES_PORT || 5432),
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'userpass',
    dbName: process.env.POSTGRES_DATABASE || 'to-do',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    env: process.env.SENTRY_ENV || 'local',
    debug: process.env.SENTRY_DEBUG === 'true',
  },
});
