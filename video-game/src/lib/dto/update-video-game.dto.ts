import { PartialType } from '@nestjs/swagger';
import { CreateVideoGameDto } from './create-video-game.dto';

export class UpdateVideoGameDto extends PartialType(CreateVideoGameDto) {}
