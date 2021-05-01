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
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsString() @IsNotEmpty() readonly createdAt: Date;
  @IsNotEmpty() @Min(0) readonly total: number;
  @IsOptional() @IsMongoId() readonly seller: User;
  @IsOptional() @IsMongoId() readonly buyer: User;
  @IsOptional() @IsMongoId() readonly products: Product[];
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
