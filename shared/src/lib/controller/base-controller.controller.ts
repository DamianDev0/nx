import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { BaseEntity, DeepPartial } from 'typeorm';
import { DynamicValidationPipe } from '../pipes/dynamic-validation.pipe';
import type { IBaseCrudService } from '../interfaces/baseCrud.interface';

export function BaseController<
  T extends BaseEntity,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends DeepPartial<T>
>(
  resource: string,
  createDtoClass: Type<CreateDto>,
  updateDtoClass: Type<UpdateDto>
) {
  @ApiTags(resource)
  @Controller(resource)
  class GenericController {
    constructor(public readonly service: IBaseCrudService<T>) {}

    @Post()
    @ApiOperation({ summary: `Create ${resource}` })
    @ApiBody({ type: createDtoClass })
    @UsePipes(new DynamicValidationPipe(createDtoClass))
    async create(@Body() dto: CreateDto) {
      return this.service.create(dto);
    }

    @Get()
    @ApiOperation({ summary: `List ${resource}` })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    async findAll(
      @Query()
      query: {
        page?: number;
        limit?: number;
        search?: string;
        [k: string]: any;
      }
    ) {
      return this.service.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get ${resource} by id` })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: `Update ${resource}` })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: updateDtoClass })
    @UsePipes(
      new DynamicValidationPipe(updateDtoClass, { skipMissingProperties: true })
    )
    async update(@Param('id') id: string, @Body() dto: UpdateDto) {
      return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete ${resource}` })
    @ApiParam({ name: 'id', type: String })
    async remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }

  return GenericController;
}
