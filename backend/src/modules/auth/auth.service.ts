import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt?: string) {
    const hashSalt = salt || (await this.bcryptService.generateSalt());
    const hashedPass = await this.bcryptService.generateHash(
      password,
      hashSalt,
    );
    return { hashSalt, hashedPass };
  }

  private async validatePassword(
    password: string,
    hashedPass: string,
  ): Promise<boolean> {
    return await this.bcryptService.validateHash(password, hashedPass);
  }

  async validateUser({ login, password }: LoginUserDto) {
    const user = await this.userService.findUserByLogin(login);
    if (!user) throw new UnauthorizedException('User does not exist.');

    const isValid = await this.validatePassword(password, user.password);
    if (!isValid) throw new UnauthorizedException('User validation failed.');

    return user;
  }

  async registerUesr(userDetails: RegisterUserDto): Promise<UserDto> {
    try {
      const emailExists = await this.userService.findUserByLogin(
        userDetails.email,
      );
      if (emailExists)
        throw new ConflictException({
          isError: true,
          errorField: 'email',
          message: 'Email is already registered.',
        });

      const usernameExists = await this.userService.findUserByLogin(
        userDetails.userName,
      );
      if (usernameExists)
        throw new ConflictException('Username already exists.');

      const { hashedPass, hashSalt } = await this.hashPassword(
        userDetails.password,
      );

      return await this.userService.createUser({
        ...userDetails,
        password: hashedPass,
        hashSalt,
      });
    } catch (err) {
      throw err;
    }
  }

  getLoginToken(username: string, userId: string): string {
    return this.jwtService.sign({ username, sub: userId });
  }
}
