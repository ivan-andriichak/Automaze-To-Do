import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_FILTER} from '@nestjs/core';

import {GlobalExceptionFilter} from './common/http/global-exception.filter';
import configuration from './config/configuration';
import {LoggerModule} from './modules/logger/logger.module';
import {PostgresModule} from './modules/postgres/postgres.module';
import {RepositoryModule} from './modules/repository/repository.module';
import {TasksModule} from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'environments/local.env',
      load: [configuration],
      isGlobal: true,
    }),
    PostgresModule,
    TasksModule,
    RepositoryModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
