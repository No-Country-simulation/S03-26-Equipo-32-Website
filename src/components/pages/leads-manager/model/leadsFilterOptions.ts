export const PRIORITY_OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: 'alta', label: 'Alta prioridad' },
  { value: 'media', label: 'Potencial medio' },
  { value: 'baja', label: 'Bajo potencial' },
] as const;

export const URGENCY_OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: 'urgente', label: 'Urgente' },
  { value: 'no-urgente', label: 'No urgente' },
] as const;

export const STATUS_OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: 'en-espera', label: 'En espera' },
  { value: 'contactado', label: 'Contactado' },
] as const;
