import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChatsModule } from '../chats/chats.module';
import { MessagesModule } from '../messages/messages.module';
import { ModelModule } from '../model/model.module';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';

@Module({
  imports: [AuthModule, MessagesModule, ChatsModule, ModelModule],
  providers: [BotService, BotGateway],
})
export class BotModule {}
