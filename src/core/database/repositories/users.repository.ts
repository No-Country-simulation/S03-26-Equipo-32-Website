import type { UserRepository } from '@/core/users/repositories/user.repository.ts';
import type { User } from '@/core/users/entities/user.entity.ts';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { db, auth } from '@/core/database/firebase/firebase.config.ts';
import { mapToUserEntity } from '@/core/database/mappers/user.mapper.ts';

const googleProvider = new GoogleAuthProvider();

export class UsersRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const docRef = await getDoc(doc(db, 'users', id));
    if (!docRef.exists()) {
      return null;
    }

    return mapToUserEntity(docRef);
  }

  async login(): Promise<User> {
    const result = await signInWithPopup(auth, googleProvider);
    const { uid, email, displayName, photoURL } = result.user;

    const existing = await this.findById(uid);
    if (existing) {
      return existing;
    }

    const now = Date.now();
    const newUser: User = {
      id: uid,
      email: email ?? '',
      name: displayName ?? '',
      imageUrl: photoURL ?? '',
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(doc(db, 'users', uid), {
      email: newUser.email,
      name: newUser.name,
      imageUrl: newUser.imageUrl,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });

    return newUser;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}
