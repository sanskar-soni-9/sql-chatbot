import { Module } from '@nestjs/common';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, BcryptModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
