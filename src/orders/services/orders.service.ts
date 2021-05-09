import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
} from '../dtos/orders.dto';
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

    const [total, orders] = await Promise.all([
      this.orderModel.countDocuments(),
      this.orderModel
        .find(filters)
        .skip(offset * limit)
        .limit(limit)
        .populate('seller')
        .populate('buyer')
        .populate({
          path: 'products.product',
          model: 'Product',
        })
        .exec(),
    ]);

    return {
      limit,
      offset,
      total,
      orders,
    };
  }

  async getById(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('seller')
      .populate('buyer')
      .populate({
        path: 'products.product',
        model: 'Product',
      });

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    return {
      order,
    };
  }

  async create(order: CreateOrderDto) {
    if (!order.products.length) {
      throw new BadRequestException('You not have been added any products');
    }

    const total = order.products.reduce((prev, next) => {
      console.log('prev', prev);
      if (typeof next === 'object') {
        return prev + next.product.price * next.quantity;
      }
      return prev + next;
    }, 0);

    const newOrder = await this.orderModel.create({
      ...order,
      // products: order.products.map(p => p._id),
      seller: '618c75d5895df75d10500966',
      // TODO: Was taken from de JWT
      buyer: '618c75d5895df75d10500966',
      createdAt: Date.now(),
      total,
    });
    return newOrder;
  }

  async update(id: string, order: UpdateOrderDto) {
    let data = await this.orderModel.findById(id);

    if (!data) {
      throw new NotFoundException('Order not exist');
    }

    data = await this.orderModel.findOneAndUpdate({ _id: id }, order, {
      new: true,
    });

    return data;
  }

  async removeProduct(id: string, productId: string) {
    let order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { $pull: { products: { product: { _id: productId } } } },
      {
        new: true,
      },
    );

    return order;
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
