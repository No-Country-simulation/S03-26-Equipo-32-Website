import type { UserRepository } from '@/core/users/repositories/user.repository.ts';

export class FindUserByIdUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  execute(id: string) {
    return this.userRepository.findById(id);
  }
}
