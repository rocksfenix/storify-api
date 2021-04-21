import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          host,
          password: pass,
          port,
          dbName,
          username: user,
        } = configService.mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, host, dbName, password, port, username } =
          configService.mongo;

        const uri = `${connection}://${username}:${password}@${host}:${port}/?authSource=admin&readPreference=primary&ssl=false`;
        const client = new MongoClient(uri);

        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
