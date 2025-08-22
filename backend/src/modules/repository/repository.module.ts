import { Global, Module } from '@nestjs/common';
import {TaskRepository} from "./services/task.repository";
import {PostgresModule} from "../postgres/postgres.module";


const repositories = [TaskRepository];
@Global()
@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
