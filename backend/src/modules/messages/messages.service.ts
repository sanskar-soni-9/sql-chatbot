import { Injectable } from '@nestjs/common';
import { PrismaService } from '../external/prisma/prisma.service';
import { AbstractMessageDto } from './dto/AbstractMessage.dto';
import { CreateMessagesDto } from './dto/CreateMessages.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessages(
    chatId: string,
    pageNo: number = 1,
    pageSize: number = 25,
  ): Promise<AbstractMessageDto[]> {
    return await this.prismaService.messages.findMany({
      where: { chatId },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
      select: { question: true, response: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  async addMessages(data: CreateMessagesDto) {
    return await this.prismaService.messages.create({ data: { ...data } });
  }
}
