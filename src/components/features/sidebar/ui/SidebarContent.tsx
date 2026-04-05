import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { navItems } from '../model/navItems';

interface SidebarContentProps {
  displayName: string;
  initials: string;
  role: string | null;
  onLogout: () => void;
  onNavClick?: () => void;
}

export const SidebarContent = ({
  displayName,
  initials,
  role,
  onLogout,
  onNavClick,
}: SidebarContentProps) => (
  <div className="flex flex-col h-full p-4">
    {/* header */}
    <div className="flex flex-col gap-1 mb-6">
      <img src="/landing/plek_logo.svg" alt="Plek logo" className="h-10 w-16" />
      <p className="text-[#71717A] uppercase text-xs">Rendimiento operativo</p>
    </div>

    {/* nav */}
    <nav className="flex flex-col gap-1 flex-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-[#6B9E7A] text-white font-medium'
                : 'text-[#71717A] hover:bg-[#EDE9E3] hover:text-zinc-800'
            }`
          }
        >
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
    </nav>

    {/* footer */}
    <div className="flex items-center gap-3 pt-4 border-t border-[#E2DDD7]">
      <div className="w-8 h-8 rounded-full bg-[#557961] flex items-center justify-center text-white text-xs font-medium shrink-0">
        {initials}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium truncate">{displayName}</span>
        <span className="text-xs text-[#71717A] truncate uppercase">
          {role}
        </span>
      </div>
      <button
        onClick={onLogout}
        className="text-[#71717A] hover:text-zinc-900 transition-colors p-1 rounded"
        title="Cerrar sesión"
      >
        <LogOut size={16} />
      </button>
    </div>
  </div>
);
