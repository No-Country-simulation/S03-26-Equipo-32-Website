import type { UserRepository } from '@/core/users/repositories/user.repository.ts';

export class LogoutUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  execute() {
    return this.userRepository.logout();
  }
}
