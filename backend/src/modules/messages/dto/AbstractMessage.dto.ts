import { OmitType } from '@nestjs/mapped-types';
import { MessageDto } from './Message.dto';

export class AbstractMessageDto extends OmitType(MessageDto, [
  'id',
  'chatId',
]) {}
