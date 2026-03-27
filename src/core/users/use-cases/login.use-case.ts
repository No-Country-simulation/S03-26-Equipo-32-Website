import type { UserRepository } from '@/core/users/repositories/user.repository.ts';

export class LoginUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  execute() {
    return this.userRepository.login();
  }
}
