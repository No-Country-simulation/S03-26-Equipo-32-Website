import { useQueryState } from 'nuqs';

export const usePriorityFilter = () => {
  return useQueryState('priority', { defaultValue: 'todos' });
};
