import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateCategoryDto } from 'src/categories/dtos/categories.dto';
import { CreateOrderDto, FilterOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAll(params?: FilterOrderDto) {
    const filters: FilterQuery<Order> = {};
    const { limit = 20, offset = 0 } = params;
    const { minTotal, maxTotal } = params;

    if (minTotal && maxTotal) {
      filters.price = { $gte: minTotal, $lte: maxTotal };
    }

    const [total, users] = await Promise.all([
      this.orderModel.countDocuments(),
      this.orderModel
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
    const user = await this.orderModel
      .findById(id)
      .populate('seller')
      .populate('buyer')
      .populate('orders');

    if (!user) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    return {
      user,
    };
  }

  async create(order: CreateOrderDto) {
    const newOrder = await this.orderModel.create({
      ...order,
      seller: '618c75d5895df75d10500966',
      // TODO: Was taken from de JWT
      buyer: '618c75d5895df75d10500966',
    });
    return newOrder;
  }

  async update(id: string, order: UpdateCategoryDto) {
    let data = await this.orderModel.findById(id);

    if (!data) {
      throw new NotFoundException('Order not exist');
    }

    data = await this.orderModel.findOneAndUpdate(
      { _id: id },
      order,
      {
        new: true,
      },
    );

    return data;
  }

  async delete(id: string) {
    const data = await this.orderModel.findById(id);

    if (!data) {
      throw new NotFoundException('Order not found');
    }

    await data.remove();

    return {
      message: `Order was deleted: ${id}`,
    };
  }
}
