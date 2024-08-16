import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserRepository } from 'src/repository';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_KEY'),
      });
      const user = await this.userRepository.findOne(
        {
          _id: payload.id,
        },
        {
          password: false,
        },
      );

      request['user'] = user;
    } catch (e) {
      throw new UnauthorizedException('Please login again!');
    }
    return true;
  }
  extractToken(req: Request) {
    const token = req.cookies['authorization'];
    return token;
  }
}
