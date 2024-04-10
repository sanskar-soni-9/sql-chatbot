import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChatsService } from '../chats/chats.service';
import { MessagesService } from '../messages/messages.service';
import { ModelService } from '../model/model.service';
import { GetQueryDto } from './dto/getQuery.dto';
import { BotWsRequestInterface } from './interfaces/getQueryRequest.interface';
import { GetChatDto } from './dto/getChat.dto';

@Injectable()
export class BotService {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
    private readonly modelService: ModelService,
  ) {}

  async handleGetChat(req: BotWsRequestInterface, body: GetChatDto) {
    const { user } = req;
    const { chatId } = body;
    try {
      if (!user) throw new UnauthorizedException();
      const res = await this.messagesService.getMessages(
        chatId,
        +body.pageNo,
        body.pageSize ? +body.pageSize : undefined,
      );
      return { isError: false, chatId, res };
    } catch (err) {
      console.error(err);
      return { isEror: true, chatId, res: 'Error getting messages.' };
    }
  }

  async handleGetQuery(req: BotWsRequestInterface, body: GetQueryDto) {
    const { user } = req;

    let { chatId } = body;
    let history: { question: string; response: string }[] = [];

    try {
      if (!user) throw new UnauthorizedException();

      if (!body.chatId) {
        const chat = await this.chatsService.createNewChat(user.userId);
        chatId = chat.id;
      } else history = await this.messagesService.getMessages(body.chatId);

      const result = await this.modelService.getData(
        body.msg,
        this.modelService.generateHistory(history),
      );
      if (!result) throw new Error('Error generating query.');

      this.messagesService.addMessages({
        chatId,
        question: body.msg,
        response: result,
      });

      return { chatId, res: result, isError: false };
    } catch (err) {
      console.log(err);
      this.messagesService.addMessages({
        chatId,
        question: body.msg,
        response: 'Error generating query.',
      });

      return { isError: true, chatId, res: 'Error generating query.' };
    }
  }
}
