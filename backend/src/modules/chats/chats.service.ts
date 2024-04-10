import { Injectable } from '@nestjs/common';
import { PrismaService } from '../external/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewChat(userId: string) {
    return await this.prismaService.chats.create({
      data: { userId: userId },
      select: { id: true },
    });
  }
}
