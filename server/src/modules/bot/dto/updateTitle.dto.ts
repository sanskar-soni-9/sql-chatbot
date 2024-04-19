import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTitleDto {
  @IsString()
  @IsNotEmpty()
  readonly chatId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
