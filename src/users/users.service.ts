import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.user.create({ email, password });
    return this.user.save(user);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.user.findOne({ where: { id } });
  }

  find(email: string) {
    return this.user.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      return new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.user.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      return new NotFoundException('User not found');
    }
    return this.user.remove(user);
  }
}
