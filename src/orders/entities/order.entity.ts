import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Schema()
export class Order extends mongoose.Document {
  @Prop()
  createdAt: Date;

  @Prop({
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'IN PROGRESS', 'COMPLETED'],
  })
  status: string;

  @Prop()
  total: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  buyer: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  seller: User;

  @Prop({
    type: [
      {
        quantity: { type: Number },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
  })
  products: { quantity: number; product: Product }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
