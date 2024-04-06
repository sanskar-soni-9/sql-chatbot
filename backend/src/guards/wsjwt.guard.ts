import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>();
    const { authorization } = client.handshake.headers;
    if (!authorization) throw new UnauthorizedException();

    try {
      const verify = await this.authService.verifyToken(
        authorization.split(' ')[1],
      );
      if (verify) return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
    return false;
  }
}
