import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, ['hashSalt']) {}
