import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorators/user.decorator';
import { SigninDto, SignupDto } from 'src/dtos';
import { AuthGaurd } from 'src/gaurds/auth.gaurd';
import { User as UserEntity, UserDocument } from 'src/repository';
import { AuthService } from 'src/services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, profileSetup } = await this.authService.login(
      signinDto.email,
      signinDto.password,
    );
    res.cookie('authorization', token, {
      expires: new Date(Date.now() + 86400000),
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });

    return {
      status: 'success',
      profileSetup,
    };
  }

  @Post('/signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signup(
      signupDto.email,
      signupDto.password,
    );
    res.cookie('authorization', token, {
      expires: new Date(Date.now() + 86400000),
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });

    return {
      status: 'success',
    };
  }
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);

    return {
      status: 'success',
    };
  }

  @Get('me')
  @UseGuards(AuthGaurd)
  async getMe(@User() user: UserEntity) {
    return {
      user,
    };
  }
}
