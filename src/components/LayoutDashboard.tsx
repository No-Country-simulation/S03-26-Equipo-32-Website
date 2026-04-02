import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/features/sidebar/ui/Sidebar';
import { userContainer } from '@/core/containers/user.container.ts';

export const LayoutDashboard = () => {
  const { user, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const displayName =
    user.displayName || user.email?.split('@')[0] || 'Usuario';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex bg-[#FCF9F5]">
      <Sidebar
        displayName={displayName}
        initials={initials}
        email={user.email}
        onLogout={() => userContainer.logout.execute()}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* mobile topbar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#F6F3EF] border-b border-[#E2DDD7]">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-[#71717A] hover:text-zinc-900 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
          <img
            src="/landing/plek_logo.svg"
            alt="Plek logo"
            className="h-7 w-12"
          />
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
