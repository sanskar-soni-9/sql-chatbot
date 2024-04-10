import { Module } from '@nestjs/common';
import { PrismaModule } from '../external/prisma/prisma.module';
import { ChatsService } from './chats.service';

@Module({
  imports: [PrismaModule],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
