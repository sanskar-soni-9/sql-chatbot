import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/passport/passport-local/local.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import RequestUserInterface from './interfaces/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleSignup(@Body() body: RegisterUserDto) {
    return await this.authService.handleRegister(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(@Req() req: RequestUserInterface) {
    return await this.authService.handleLogin(req);
  }
}
