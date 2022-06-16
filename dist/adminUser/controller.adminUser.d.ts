import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { userService } from './service.user';
export declare class UserController {
  private userService;
  constructor(userService: UserService);
  getMe(user: User): User;
  editUser(userId: number, dto: EditUserDto): Promise<User>;
}
