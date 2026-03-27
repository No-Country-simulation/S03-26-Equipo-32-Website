import type { User } from '@/core/users/entities/user.entity.ts';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  login(): Promise<User>;
  logout(): Promise<void>;
}
