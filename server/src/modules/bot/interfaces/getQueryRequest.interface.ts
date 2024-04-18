import { Request } from 'express';
import { JwtAuthPayload } from 'src/interfaces/jwt.interface';

export interface BotWsRequestInterface extends Request {
  user: JwtAuthPayload;
}
