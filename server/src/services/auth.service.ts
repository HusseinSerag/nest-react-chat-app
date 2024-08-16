import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User as UserEntity, UserRepository } from 'src/repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UserRepository,
    private jwtSerivce: JwtService,
    private configService: ConfigService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    if (!user) {
      throw new ForbiddenException("Email doesn't exist!");
    }
    const isValidated = await user.validatePassword(password);
    if (!isValidated) {
      throw new ForbiddenException('Incorrect password!');
    }

    const token = await this.jwtSerivce.signAsync(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('JWT_KEY'),
        expiresIn: '1d',
      },
    );

    return {
      token,
      profileSetup: user.profileSetup,
    };
  }

  async signup(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    if (user) {
      throw new ForbiddenException('Email already exists!');
    }

    const newUser = await this.usersRepository.create(email, password);
    const token = await this.jwtSerivce.signAsync(
      {
        id: newUser.id,
      },
      {
        secret: this.configService.get<string>('JWT_KEY'),
        expiresIn: '1d',
      },
    );
    return token;
  }

  async logout(res: Response) {
    res.cookie('authorization', '');
    return;
  }
}
