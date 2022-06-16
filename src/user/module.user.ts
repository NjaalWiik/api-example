import { Module } from '@nestjs/common';
import { UserService } from './service.user';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserController {}
