import { useQueryState } from 'nuqs';

export const useStatusFilter = () => {
  return useQueryState('status', { defaultValue: 'todos' });
};
