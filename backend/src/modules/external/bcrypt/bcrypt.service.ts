import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService {
  async generateSalt() {
    return await genSalt();
  }

  async generateHash(data: string | Buffer, salt: string | number) {
    return await hash(data, salt);
  }

  async validateHash(data: string | Buffer, encrypted: string) {
    return await compare(data, encrypted);
  }
}
