import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;
}
