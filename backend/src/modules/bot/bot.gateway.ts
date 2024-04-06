import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsJwtGuard } from 'src/guards/wsjwt.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BotGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('query')
  handleQuery(@MessageBody() msg: string) {
    console.log(msg);
    return msg;
  }
}
