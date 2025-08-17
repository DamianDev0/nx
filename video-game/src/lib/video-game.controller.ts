import { VideoGame } from '@monorepo-nest/database';
import { BaseController } from '@monorepo-nest/shared';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';

export class VideoGameController extends BaseController<
  VideoGame,
  CreateVideoGameDto,
  UpdateVideoGameDto
>('video-games', CreateVideoGameDto, UpdateVideoGameDto) {}
