import { Category } from '@monorepo-nest/database';
import { BaseController } from '@monorepo-nest/shared';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class CategoryController extends BaseController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
>('categories', CreateCategoryDto, UpdateCategoryDto) {}
