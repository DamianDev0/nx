import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from '@monorepo-nest/shared';
import { VideoGame, Category } from '@monorepo-nest/database';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';

@Injectable()
export class VideoGameService extends GenericService<VideoGame> {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepo: Repository<VideoGame>,
  ) {
    super(videoGameRepo);
  }

  override async create(dto: CreateVideoGameDto): Promise<VideoGame> {
    const entity = this.videoGameRepo.create({
      ...dto,
      category: { id: dto.categoryId } as unknown as Category,
    });
    return this.videoGameRepo.save(entity);
  }

  override async update(
    id: string,
    dto: UpdateVideoGameDto,
  ): Promise<VideoGame> {
    const entity = await this.findOne(id);
    if (dto.categoryId) {
      entity.category = { id: dto.categoryId } as unknown as Category;
    }
    Object.assign(entity, dto);
    return this.videoGameRepo.save(entity);
  }
}
