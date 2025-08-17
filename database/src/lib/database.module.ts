import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './config/database.config';
import { Category } from './entities/category.entity';
import { VideoGame } from './entities/video-game.entity';

@Module({
  imports: [
    ConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Category, VideoGame]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class MonorepoNestDatabaseModule {}
