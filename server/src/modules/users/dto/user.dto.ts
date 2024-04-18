import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string | null;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z][A-Za-z0-9 ]+$/)
  readonly userName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
