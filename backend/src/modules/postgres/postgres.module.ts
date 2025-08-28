import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../../config/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => {
        const isProduction = process.env.NODE_ENV === 'production';
        if (isProduction) {
          return {
            type: 'postgres',
            url: process.env.POSTGRES_URL,
            ssl: { rejectUnauthorized: false },
            entities: [path.join(__dirname, '..', '..', 'database', 'entities', '*.entity.{js,ts}')],
            migrations: [path.join(__dirname, '..', '..', 'database', 'migrations', '*.{js,ts}')],
            migrationsRun: true,
            synchronize: false,
            logging: true,
          };
        } else {
          const config = configService.get('postgres');
          return {
            type: 'postgres',
            host: config?.host,
            port: config?.port,
            username: config?.user,
            password: config?.password,
            database: config?.dbName,
            entities: [path.join(__dirname, '..', '..', 'database', 'entities', '*.entity.{js,ts}')],
            migrations: [path.join(__dirname, '..', '..', 'database', 'migrations', '*.{js,ts}')],
            migrationsRun: true,
            synchronize: false,
            logging: true,
          };
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
