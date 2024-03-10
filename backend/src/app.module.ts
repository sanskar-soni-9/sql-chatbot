import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import coreConfig from './config/core.config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [coreConfig, jwtConfig] }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
