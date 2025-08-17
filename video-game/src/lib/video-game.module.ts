import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from '@monorepo-nest/database';
import { VideoGameService } from './video-game.service';
import { VideoGameController } from './video-game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideoGame])],
  controllers: [VideoGameController],
  providers: [VideoGameService],
  exports: [VideoGameService],
})
export class MonorepoNestVideoGameModule {}
