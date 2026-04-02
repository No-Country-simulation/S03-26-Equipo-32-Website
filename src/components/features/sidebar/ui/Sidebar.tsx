import { X } from 'lucide-react';
import { SidebarContent } from './SidebarContent';

const SIDEBAR_WIDTH = 'w-64';

interface SidebarProps {
  displayName: string;
  initials: string;
  email: string | null;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar = ({
  displayName,
  initials,
  email,
  onLogout,
  mobileOpen,
  onMobileClose,
}: SidebarProps) => {
  const sharedProps = { displayName, initials, email, onLogout };

  return (
    <>
      {/* desktop */}
      <aside
        className={`hidden md:flex flex-col ${SIDEBAR_WIDTH} shrink-0 bg-[#F6F3EF] h-screen sticky top-0`}
      >
        <SidebarContent {...sharedProps} />
      </aside>

      {/* mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* mobile sheet */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${SIDEBAR_WIDTH} bg-[#F6F3EF] flex flex-col transform transition-transform duration-200 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={onMobileClose}
          className="absolute top-3 right-3 text-[#71717A] hover:text-zinc-900 transition-colors p-1"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
        <SidebarContent {...sharedProps} onNavClick={onMobileClose} />
      </aside>
    </>
  );
};
