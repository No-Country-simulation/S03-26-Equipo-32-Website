import { ChartNoAxesColumn, LayoutDashboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { to: '/panel-general', label: 'Panel General', icon: LayoutDashboard },
  { to: '/prospectos', label: 'Gestión de Leads', icon: ChartNoAxesColumn },
];
