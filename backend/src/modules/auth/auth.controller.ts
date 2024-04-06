import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/guards/passport/passport-local/local.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import RequestUserInterface from './interfaces/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleSignup(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.handleRegister(body, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(
    @Req() req: RequestUserInterface,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.handleLogin(req, res);
  }
}
