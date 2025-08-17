import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonorepoNestSharedModule } from '@monorepo-nest/shared';
import { MonorepoNestDatabaseModule } from '@monorepo-nest/database';

@Module({
  imports: [MonorepoNestSharedModule, MonorepoNestDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
