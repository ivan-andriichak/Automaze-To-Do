import * as process from 'node:process';

import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: Number(process.env.APP_PORT || process.env.PORT || 10000),
    host: process.env.APP_HOST || '0.0.0.0',
    appUrl: process.env.APP_URL || 'https://automaze-to-do.vercel.app',
  },
  postgres: {
    port: process.env.NODE_ENV === 'production' ? 5433 : Number(process.env.POSTGRES_PORT || 5433),
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'userpass',
    dbName: process.env.POSTGRES_DATABASE || 'to-do',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    env: process.env.SENTRY_ENV || 'production',
    debug: process.env.SENTRY_DEBUG === 'true',
  },
});
