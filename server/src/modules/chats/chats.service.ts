import { Injectable } from '@nestjs/common';
import { PrismaService } from '../external/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserChats(userId: string) {
    return await this.prismaService.chats.findMany({
      where: { userId },
      select: { id: true, title: true },
    });
  }

  async createNewChat(userId: string) {
    return await this.prismaService.chats.create({
      data: { userId: userId },
      select: { id: true, title: true },
    });
  }

  async updateTitle(chatId: string, title: string) {
    return await this.prismaService.chats.update({
      data: { title },
      where: { id: chatId },
    });
  }
}
