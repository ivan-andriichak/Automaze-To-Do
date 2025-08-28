import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import getter from './src/config/configuration';

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  dotenv.config({ path: './environments/local.env' });
}

const databaseConfig = getter().postgres;

console.log('ormconfig.ts Config:', {
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.dbName,
  POSTGRES_URL: process.env.POSTGRES_URL,
});

if (isProduction && !process.env.POSTGRES_URL) {
  throw new Error('Missing POSTGRES_URL in production environment');
}

if (
  !isProduction &&
  (!databaseConfig.host || !databaseConfig.user || !databaseConfig.password || !databaseConfig.dbName)
) {
  throw new Error('Missing PostgreSQL configuration in ormconfig.ts for non-production');
}

export default new DataSource({
  type: 'postgres',
  ...(isProduction
    ? {
        url: process.env.POSTGRES_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.dbName,
      }),
  entities: [path.join(__dirname, 'src', 'database', 'entities', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src', 'database', 'migrations', '*.{ts,js}')],
  synchronize: false,
  dropSchema: false,
  logging: true,
  migrationsRun: isProduction,
});
