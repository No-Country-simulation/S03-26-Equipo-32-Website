import { useQueryState } from 'nuqs';

export const useUrgencyFilter = () => {
  return useQueryState('urgency', { defaultValue: 'todos' });
};
