import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByLogin(login: string) {
    return await this.prisma.user.findFirst({
      where: { OR: [{ userName: login }, { email: login }] },
    });
  }

  async createUser({
    firstName,
    lastName,
    userName,
    email,
    password,
    hashSalt,
  }: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          password,
          hashSalt,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error('Error occured while creating new uesr.');
    }
  }
}
