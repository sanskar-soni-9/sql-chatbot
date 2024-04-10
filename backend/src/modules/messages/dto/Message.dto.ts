import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  id: string;

  @IsString()
  chatId: string;

  @IsString()
  question: string;

  @IsString()
  response: string;
}
