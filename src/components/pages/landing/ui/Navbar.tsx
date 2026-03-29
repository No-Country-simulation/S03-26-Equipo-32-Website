import { Logo } from '@/components/share/ui/logo.tsx';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-[#173901]">
      <Logo className={'mx-auto'} />
    </nav>
  );
};
