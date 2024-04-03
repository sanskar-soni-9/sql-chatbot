import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import coreConfig from './config/core.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [coreConfig] }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
