import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from '@monorepo-nest/shared';
import { Category } from '@monorepo-nest/database';

@Injectable()
export class CategoryService extends GenericService<Category> {
  constructor(
    @InjectRepository(Category)
    repository: Repository<Category>,
  ) {
    super(repository);
  }
}
