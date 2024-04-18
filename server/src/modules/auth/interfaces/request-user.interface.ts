import { Request } from 'express';

export default interface RequestUserInterface extends Request {
  user: {
    userName: string;
    id: string;
  };
}
