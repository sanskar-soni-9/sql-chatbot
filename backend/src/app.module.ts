import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import coreConfig from './config/core.config';
import { AuthModule } from './modules/auth/auth.module';
import { BotModule } from './modules/bot/bot.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [coreConfig] }),
    AuthModule,
    UsersModule,
    BotModule,
  ],
})
export class AppModule {}
