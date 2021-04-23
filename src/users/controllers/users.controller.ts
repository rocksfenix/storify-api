import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUsersDto,
} from 'src/users/dtos/users.dto';
import { UsersService } from '../services/users.service';
import { MongoIdPipe } from '../../common/pipes/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query() params?: FilterUsersDto) {
    return this.userService.getAll(params);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  create(@Body('user') user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.userService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update single user by id' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body('user') user: UpdateUserDto,
  ) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single user by id' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.userService.delete(id);
  }
}
