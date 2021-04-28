import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString() @IsNotEmpty() readonly title: string;
  @IsString() @IsOptional() readonly slug: string;
  @IsString() @IsNotEmpty() readonly description: string;
  @IsOptional() readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FilterCategoryDto {
  @IsOptional() @IsPositive() limit: number;
  @IsOptional() @Min(0) offset: number;
}
