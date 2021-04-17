import {
  IsString,
  IsUrl,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user' })
  readonly name: string;
  @IsString() @IsNotEmpty() readonly lastname: string;
  @IsEmail() @IsNotEmpty() readonly email: string;
  @IsString() @IsNotEmpty() readonly password: string;
  @IsUrl() @IsOptional() readonly avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
