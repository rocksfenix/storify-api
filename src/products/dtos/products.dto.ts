import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  IsMongoId,
  ValidateIf,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsString() @IsNotEmpty() readonly title: string;
  @IsString() @IsNotEmpty() readonly description: string;
  @IsNotEmpty() @IsPositive() readonly price: number;
  @IsNotEmpty() @Min(0) readonly stock: number;
  @IsOptional() @IsMongoId() readonly seller: User;
  @IsOptional() @IsMongoId() readonly category: Category;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional() @IsPositive() limit: number;
  @IsOptional() @Min(0) offset: number;

  @IsOptional() @Min(0) minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
