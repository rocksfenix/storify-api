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
import { ProductsService } from 'src/products/services/products/products.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query() params?: FilterProductDto) {
    return this.productService.getAll(params);
  }

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  create(@Body('product') product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single product by id' })
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.productService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update single product by id' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body('product') product: UpdateProductDto,
  ) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single product by id' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
