import { UsersRepository } from '@/core/database/repositories/users.repository.ts';
import { LoginUseCase } from '@/core/users/use-cases/login.use-case.ts';
import { LogoutUseCase } from '@/core/users/use-cases/logout.use-case.ts';
import { FindUserByIdUseCase } from '@/core/users/use-cases/find-user-by-id.use-case.ts';

const userRepository = new UsersRepository();

export const userContainer = {
  login: new LoginUseCase(userRepository),
  logout: new LogoutUseCase(userRepository),
  findUserById: new FindUserByIdUseCase(userRepository),
};
