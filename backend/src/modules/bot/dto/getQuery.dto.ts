import { IsNotEmpty, IsString } from 'class-validator';

export class GetQueryDto {
  @IsString()
  readonly chatId: string;

  @IsString()
  @IsNotEmpty()
  readonly msg: string;
}
