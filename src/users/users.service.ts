import { Injectable } from '@nestjs/common';
import { iUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: iUser[] = [
    {
      _id: 'test',
      username: 'cdwrss',
      password: '123123123',
      role: 'admin',
    },
    {
      _id: 'test2',
      username: 'maria',
      password: 'guess',
      role: 'guest',
    },
  ];

  async findOne(username: string): Promise<iUser | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
