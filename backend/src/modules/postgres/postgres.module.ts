import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config, PostgresConfig } from '../../config/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => {
        const config = configService.get<PostgresConfig>('postgres');
        const isProduction = process.env.NODE_ENV === 'production';

        return {
          type: 'postgres',
          host: config?.host,
          port: config?.port,
          username: config?.user,
          password: config?.password,
          database: config?.dbName,
          entities: [
            isProduction
              ? path.join(__dirname, '..', '..', 'database', 'entities', '*.entity.js')
              : path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
          ],
          migrations: [
            isProduction
              ? path.join(__dirname, '..', '..', 'database', 'migrations', '*.js')
              : path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
          ],
          migrationsRun: true,
          synchronize: false,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
