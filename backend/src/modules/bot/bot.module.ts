import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [AuthModule],
  providers: [BotGateway],
})
export class BotModule {}
