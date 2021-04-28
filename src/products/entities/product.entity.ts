import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { string } from 'joi';
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

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: User;

  // @Prop(raw({
  //   title: {
  //     type: string,
  //   },
  //   image: {
  //     type: string,
  //   } 
  // })),
  // category: Record<string, any>
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 })
