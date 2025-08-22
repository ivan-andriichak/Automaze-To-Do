import {Global, Module} from '@nestjs/common';

import {PostgresModule} from '../postgres/postgres.module';
import {TaskRepository} from './services/task.repository';

const repositories = [TaskRepository];
@Global()
@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
