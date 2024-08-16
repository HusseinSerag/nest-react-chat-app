import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule, CloudinaryModule, UsersModule } from './modules';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CloudinaryModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
