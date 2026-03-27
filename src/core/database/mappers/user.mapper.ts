import type { DocumentSnapshot } from 'firebase/firestore';
import type { User } from '@/core/users/entities/user.entity.ts';

export function mapToUserEntity(doc: DocumentSnapshot): User {
  const data = doc.data();
  return {
    id: doc.id,
    email: data?.email ?? '',
    name: data?.name ?? '',
    imageUrl: data?.imageUrl ?? '',
    createdAt: data?.createdAt ?? 0,
    updatedAt: data?.updatedAt ?? 0,
  };
}
