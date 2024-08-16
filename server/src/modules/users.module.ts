import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository, UserSchema } from 'src/repository';
import { UsersController } from '../controllers';
import { CloudinaryModule } from './cloudinary.module';

@Module({
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CloudinaryModule,
  ],
  controllers: [UsersController],
  exports: [UserRepository],
})
export class UsersModule {}
