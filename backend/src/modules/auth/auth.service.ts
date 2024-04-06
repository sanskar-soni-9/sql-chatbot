import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { BcryptService } from '../external/bcrypt/bcrypt.service';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import RequestUserInterface from './interfaces/request-user.interface';
import { JwtAuthPayload } from 'src/interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt?: string): Promise<string> {
    const hashedPass = await this.bcryptService.generateHash(
      password,
      salt || (await this.bcryptService.generateSalt()),
    );
    return hashedPass;
  }

  private async validatePassword(
    password: string,
    hashedPass: string,
  ): Promise<boolean> {
    return await this.bcryptService.validateHash(password, hashedPass);
  }

  async validateUser({ login, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userService.findUserByLogin(login);
    if (!user) throw new UnauthorizedException('User does not exist.');

    const isValid = await this.validatePassword(password, user.password);
    if (!isValid) throw new UnauthorizedException('User validation failed.');

    return user;
  }

  async createNewUser(userDetails: RegisterUserDto): Promise<UserDto> {
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

      const hashedPass = await this.hashPassword(userDetails.password);

      return await this.userService.createUser({
        ...userDetails,
        password: hashedPass,
      });
    } catch (err) {
      throw err;
    }
  }

  async getLoginToken(user: JwtAuthPayload): Promise<string> {
    return await this.jwtService.signAsync(user);
  }

  async verifyToken(token: string): Promise<JwtAuthPayload> {
    return await this.jwtService.verifyAsync<JwtAuthPayload>(token);
  }

  async handleRegister(body: RegisterUserDto, res: Response) {
    try {
      const user = await this.createNewUser(body);
      const token = await this.getLoginToken({
        userName: user.userName,
        userId: user.id,
      });
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

  async handleLogin(req: RequestUserInterface, res: Response) {
    try {
      const { user } = req;
      if (!user) throw new UnauthorizedException('User Authentication Failed.');
      const token = await this.getLoginToken({
        userName: user.userName,
        userId: user.id,
      });
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
