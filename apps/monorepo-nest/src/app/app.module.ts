import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonorepoNestSharedModule } from '@monorepo-nest/shared';
import { MonorepoNestDatabaseModule } from '@monorepo-nest/database';
import { MonorepoNestCategoryModule } from '@monorepo-nest/category';
import { MonorepoNestVideoGameModule } from '@monorepo-nest/video-game';

@Module({
  imports: [
    MonorepoNestSharedModule,
    MonorepoNestDatabaseModule,
    MonorepoNestCategoryModule,
    MonorepoNestVideoGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
