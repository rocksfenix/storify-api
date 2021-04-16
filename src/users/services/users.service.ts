import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(limit: number, offset: number) {
    return {
      limit,
      offset,
      users: this.users,
    };
  }

  getById(id: string) {
    const user = this.users.find((_user: User) => _user.id === id);

    if (!user) {
      throw new NotFoundException(`User not found: ${id}`);
    }

    return {
      user,
    };
  }

  create(user: CreateUserDto) {
    const id = Math.random().toString(16).substring(2);
    const newUser = {
      ...user,
      id,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, user: UpdateUserDto) {
    this.users = this.users.map((_user: User) => {
      if (_user.id === id) {
        return {
          ..._user,
          ...user,
        };
      }
      return _user;
    });
    return this.users.find((_user: User) => _user.id === id);
  }

  delete(id: string) {
    this.users = this.users.filter((_user: User) => _user.id !== id);
    return {
      message: `User was deletes succesfully: ${id}`,
    };
  }
}
