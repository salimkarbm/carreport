import { User } from '../users.entity';
export interface Request {
  [x: string]: Promise<User>;
  req: Promise<User>;
  currentUser?: User;
}
