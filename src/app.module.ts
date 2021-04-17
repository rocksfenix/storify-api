import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { envFilePath } from './enviroments';
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
  imports: [configModule, HttpModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
