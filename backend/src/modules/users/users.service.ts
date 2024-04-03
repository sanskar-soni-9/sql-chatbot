import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByLogin(login: string) {
    return await this.prisma.users.findFirst({
      where: { OR: [{ email: login }, { userName: login }] },
    });
  }

  async createUser(user: CreateUserDto) {
    try {
      return await this.prisma.users.create({
        data: { ...user },
      });
    } catch (err) {
      console.error(err);
      throw new Error('Error occured while creating new uesr.');
    }
  }
}
