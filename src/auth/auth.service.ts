import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const isUser = await this.usersService.find(email);
    if (isUser) {
      throw new BadRequestException('Email in use');
    }
    //Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and salt together

    const result = salt + '.' + hash.toString('hex');

    // create user  andd save to datebase
    const user = await this.usersService.create(email, result);

    //return user
    return user;
  }

  async signin(email: string, password: string) {
    const isUser = await this.usersService.find(email);
    if (!isUser) {
      throw new BadRequestException('user not found');
    }
    const [salt, storedHash] = isUser.password.split('.');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('invalid password');
    }
    //return user
    return isUser;
  }
}
