import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './common/shared.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SharedModule,
    SequelizeModule.forRoot({
      logging: console.log,
      dialect:  'postgres', 
      database: process.env.DB_NAME,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: 5432, 
      autoLoadModels: true, 
      synchronize: true,
    }),
    UsersModule,
    AuthsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
