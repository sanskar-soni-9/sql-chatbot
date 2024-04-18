import { OmitType } from '@nestjs/mapped-types';
import { MessageDto } from './Message.dto';

export class CreateMessagesDto extends OmitType(MessageDto, ['id']) {}
