import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto
} from 'src/categories/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAll(params?: FilterCategoryDto) {
    const { limit = 20, offset = 0 } = params;

    const [total, categories] = await Promise.all([
      this.categoryModel.countDocuments(),
      this.categoryModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec(),
    ]);

    return {
      limit,
      offset,
      total,
      categories,
    };
  }

  async getById(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(`Category was not found: ${id}`);
    }

    return {
      category,
    };
  }

  async create(category: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create({
      ...category,
      slug: category.title.replace(' ', '-')
    });
    return newCategory;
  }

  async update(id: string, category: UpdateCategoryDto) {
    let data = await this.categoryModel.findById(id);

    if (!data) {
      throw new NotFoundException(`Category doesn't exist`);
    }

    data = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      category,
      {
        new: true,
      },
    );

    return data;
  }

  async delete(id: string) {
    const data = await this.categoryModel.findById(id);

    if (!data) {
      throw new NotFoundException('Category was not found');
    }

    await data.remove();

    return {
      message: `Category was deleted: ${id}`,
    };
  }
}
