import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetChatDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsNumber()
  @IsInt()
  pageNo: number;

  @IsNumber()
  @IsInt()
  @IsOptional()
  pageSize: number | undefined;
}
