import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAll(params?: FilterProductDto) {
    const filters: FilterQuery<Product> = {};
    const { limit = 20, offset = 0 } = params;
    const { minPrice, maxPrice } = params;

    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }

    const [total, users] = await Promise.all([
      this.productModel.countDocuments(),
      this.productModel
        .find(filters)
        .skip(offset * limit)
        .limit(limit)
        .populate('category')
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
    const user = await this.productModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found: ${id}`);
    }

    return {
      user,
    };
  }

  async create(product: CreateProductDto) {
    const newProduct = await this.productModel.create({
      ...product,
      slug: product.title.replace(' ', '-'),
      seller: '618c75d5895df75d10500966',
    });
    return newProduct;
  }

  async update(id: string, product: UpdateProductDto) {
    let productData = await this.productModel.findById(id);

    if (!productData) {
      throw new NotFoundException('User not exist');
    }

    productData = await this.productModel.findOneAndUpdate(
      { _id: id },
      product,
      {
        new: true,
      },
    );

    return productData;
  }

  async delete(id: string) {
    const data = await this.productModel.findById(id);

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    await data.remove();

    return {
      message: `User was deleted: ${id}`,
    };
  }
}
