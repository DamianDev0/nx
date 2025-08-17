import { DeepPartial } from 'typeorm';

export interface IBaseCrudService<T> {
  create(dto: DeepPartial<T>): Promise<T>;
  findAll(
    query?: Record<string, any>
  ): Promise<{ data: T[]; total?: number } | T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, dto: DeepPartial<T>): Promise<T>;
  remove(id: string): Promise<void | { affected?: number }>;
}
