import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtAuthPayload } from 'src/interfaces/jwt.interface';
import { AuthService } from 'src/modules/auth/auth.service';

interface ClientInterface extends Socket {
  user: JwtAuthPayload;
}

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const client = context.switchToWs().getClient<ClientInterface>();
      const { authorization } = client.handshake.headers;
      if (!authorization) throw new UnauthorizedException();

      client.user = await this.authService.verifyToken(
        authorization.split(' ')[1],
      );
      if (client.user) return true;
    } catch (err) {
      console.error(err);
    }

    return false;
  }
}
