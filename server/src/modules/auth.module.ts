import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers';
import { AuthService } from 'src/services';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: '86400s',
      },
    }),
  ],
})
export class AuthModule {}
