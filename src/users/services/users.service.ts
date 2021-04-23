import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUsersDto,
} from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private users: User[] = [];

  async getAll(params?: FilterUsersDto) {
    const { limit = 20, offset = 0 } = params;

    const [total, users] = await Promise.all([
      this.userModel.countDocuments(),
      this.userModel
        .find()
        .skip(offset * limit)
        .limit(limit)
        .exec(),
    ]);

    return {
      limit,
      offset,
      total,
      users,
    };
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found: ${id}`);
    }

    return {
      user,
    };
  }

  async create(user: CreateUserDto) {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async update(id: string, user: UpdateUserDto) {
    let userData = await this.userModel.findById(id);

    if (!userData) {
      throw new NotFoundException('User not exist');
    }

    userData = await this.userModel.findOneAndUpdate({ _id: id }, user, {
      new: true,
    });

    return userData;
  }

  async delete(id: string) {
    const userData = await this.userModel.findById(id);

    if (!userData) {
      throw new NotFoundException('User not exist');
    }

    await userData.remove();

    return {
      message: `User was deleted: ${id}`,
    };
  }
}
