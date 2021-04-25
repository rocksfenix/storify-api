import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  IsMongoId,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';


export class CreateProductDto {
  @IsString() @IsNotEmpty() readonly title: string;
  @IsString() @IsNotEmpty() readonly description: string;
  @IsNotEmpty() @IsPositive() readonly price: number;
  @IsNotEmpty() @Min(0) readonly stock: number;
  @IsOptional() @IsMongoId() readonly seller: User;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional() @IsPositive() limit: number;
  @IsOptional() @Min(0) offset: number;
}