import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/config/jwt.config';
import { LocalStrategy } from 'src/guards/passport/passport-local/local.strategy';
import { BcryptModule } from '../external/bcrypt/bcrypt.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('jwtConfig'),
      }),
      inject: [ConfigService],
    }),
    BcryptModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
