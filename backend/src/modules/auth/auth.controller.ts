import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './passport/passport-local/local.guard';
import RequestUserInterface from './interfaces/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleSignup(
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterUserDto,
  ) {
    try {
      const user = await this.authService.registerUesr(body);
      const token = this.authService.getLoginToken(user.userName, user.id);
      res.cookie('token', token, { httpOnly: true });
      return {
        isError: false,
        status: 'success',
        message: 'User registered successfully.',
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(
    @Req() req: RequestUserInterface,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { user } = req;
      if (!user) throw new UnauthorizedException('User Authentication Failed.');
      const token = this.authService.getLoginToken(user.userName, user.id);
      res.cookie('token', token, { httpOnly: true });
      return {
        isError: false,
        status: 'success',
        message: 'User Logged in successfully.',
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
