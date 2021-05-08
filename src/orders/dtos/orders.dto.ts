import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  IsMongoId,
  ValidateIf,
  IsArray,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Type } from 'class-transformer';
import { CreateProductDto } from 'src/products/dtos/products.dto';

export class CreateOrderDto {
  @IsString() @IsOptional() readonly createdAt: Date;
  @IsOptional() @Min(0) readonly total: number;
  @IsOptional() @IsMongoId() readonly seller: User;
  @IsOptional() @IsMongoId() readonly buyer: User;
  @Type(() => CreateProductDto)
  @IsArray() readonly products: {
    quantity: number;
    product: Product
  }[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrderDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minTotal: number;

  @ValidateIf((params) => params.minTotal)
  @IsPositive()
  maxTotal: number;
}
