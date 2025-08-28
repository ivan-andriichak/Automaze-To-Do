import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  dotenv.config({ path: './environments/local.env' });
}

export default new DataSource({
  type: 'postgres',
  ...(isProduction
    ? {
        url: process.env.POSTGRES_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
      }),
  entities: [path.join(__dirname, 'src', 'database', 'entities', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src', 'database', 'migrations', '*.{ts,js}')],
  synchronize: false,
  dropSchema: false,
  logging: true,
  migrationsRun: isProduction,
});
