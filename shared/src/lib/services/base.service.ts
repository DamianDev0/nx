/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BaseEntity,
  DeepPartial,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { IPaginationResponse, PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class GenericService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }
  async update(id: string, updateDto: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    this.repository.merge(entity, updateDto);
    return await this.repository.save(entity);
  }

  async delete(id: string): Promise<T> {
    const deletedItem = await this.repository.findOne({ where: { id } as any });
    if (!deletedItem) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    await this.repository.softDelete(id);
    return deletedItem;
  }

  async findWithPagination(
    paginationDto: PaginationDto,
    customizeQueryBuilder?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>
  ): Promise<IPaginationResponse<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortDirection = 'desc',
    } = paginationDto;

    const skip = (page - 1) * limit;

    let qb = this.repository.createQueryBuilder('entity');

    if (customizeQueryBuilder) {
      qb = customizeQueryBuilder(qb);
    }

    const [items, total] = await qb
      .orderBy(
        `entity.${sortBy}`,
        sortDirection.toUpperCase() as 'ASC' | 'DESC'
      )
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }
}
