import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChatsService } from '../chats/chats.service';
import { MessagesService } from '../messages/messages.service';
import { ModelService } from '../model/model.service';
import { GetQueryDto } from './dto/getQuery.dto';
import { BotWsRequestInterface } from './interfaces/getQueryRequest.interface';
import { GetChatDto } from './dto/getChat.dto';
import { UpdateTitleDto } from './dto/updateTitle.dto';

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
      return { isError: false, chatId, data: res, msg: 'success' };
    } catch (err) {
      console.error(err);
      return { isEror: true, chatId, msg: 'Error getting messages.' };
    }
  }

  async handleGetChats(req: BotWsRequestInterface) {
    const { user } = req;
    try {
      if (!user) throw new UnauthorizedException();
      const res = await this.chatsService.getUserChats(user.userId);
      return { isError: false, data: res, msg: 'success' };
    } catch (err) {
      console.error(err);
      return { isError: true, msg: 'error getting chats.' };
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

      return { chatId, data: result, isError: false, msg: 'success' };
    } catch (err) {
      console.log(err);
      if (body.msg)
        this.messagesService.addMessages({
          chatId,
          question: body.msg,
          response: 'Error generating query.',
        });

      return { isError: true, chatId, msg: 'Error generating query.' };
    }
  }

  async handleUpdateTitle(body: UpdateTitleDto) {
    const { chatId, title } = body;
    await this.chatsService.updateTitle(chatId, title);
    return { isError: false, msg: 'success' };
  }
}
