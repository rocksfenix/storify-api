import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Product extends mongoose.Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
