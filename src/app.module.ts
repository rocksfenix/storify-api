import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { envFilePath } from './environments';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import config from './config';

const configModule = ConfigModule.forRoot({
  envFilePath,
  load: [config],
  isGlobal: true,
  validationSchema: Joi.object({
    API_KEY: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    PORT: Joi.number().required(),
  }),
});

@Module({
  imports: [configModule, HttpModule, UsersModule, DatabaseModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
