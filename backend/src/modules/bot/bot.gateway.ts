import { Req, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsJwtGuard } from 'src/guards/wsjwt.guard';
import { BotService } from './bot.service';
import { GetChatDto } from './dto/getChat.dto';
import { GetQueryDto } from './dto/getQuery.dto';
import { BotWsRequestInterface } from './interfaces/getQueryRequest.interface';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'dev' ? '*' : process.env.FRONT_BASE_URL,
  },
})
export class BotGateway {
  constructor(private readonly botService: BotService) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getChat')
  async handleGetChat(
    @Req() req: BotWsRequestInterface,
    @MessageBody() body: GetChatDto,
  ) {
    return await this.botService.handleGetChat(req, body);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getChats')
  async handleGetChats(@Req() req: BotWsRequestInterface) {
    return await this.botService.handleGetChats(req);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getQuery')
  async handleQuery(
    @Req() req: BotWsRequestInterface,
    @MessageBody() body: GetQueryDto,
  ) {
    return await this.botService.handleGetQuery(req, body);
  }
}
