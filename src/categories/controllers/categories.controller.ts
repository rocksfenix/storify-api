import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query() params?: FilterCategoryDto) {
    return this.categoriesService.getAll(params);
  }

  @Post()
  @ApiOperation({ summary: 'Create new category' })
  create(@Body('category') category: CreateCategoryDto) {
    return this.categoriesService.create(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single category by id' })
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update single category by id' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body('category') category: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single category by id' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.delete(id);
  }

}
