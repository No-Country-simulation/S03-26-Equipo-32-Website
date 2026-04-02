import { Navigate } from 'react-router-dom';
import { userContainer } from '@/core/containers/user.container';
import { useAuth } from '@/context/AuthContext';

export const LoginPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Navigate to="/panel-general" replace />;

  return (
    <main className="min-h-screen bg-[#F6F5F3] flex flex-col items-center">
      <section className="w-full max-w-190 flex-1 flex flex-col items-center px-6 pt-20">
        <p className="font-cormorant tracking-[0.35em] text-[#244C23] text-5xl font-bold  mt-1 md:mt-16">
          PLEK
        </p>

        <h1 className="mt-8 md:mt-[64px] text-[#244C23] font-cormorant text-5xl md:text-6xl text-center leading-tight ">
          Accede a tu dashboard
        </h1>

        <button
          onClick={() => userContainer.login.execute()}
          type="button"
          className="mt-12 md:mt-[111px] w-full max-w-[448px] h-14 border border-[#E7E7E7] bg-white hover:inset-shadow-sm hover:shadow-lg  flex items-center justify-center gap-3 text-[#717171] font-dm-sans text-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuar con Google
        </button>

        <p className="mt-16 text-[#8A9B83] text-xs tracking-[0.2em] font-dm-sans uppercase">
          Acceso exclusivo
        </p>
        <div
          className="w-full max-w-[440px] h-1 mt-5"
          style={{
            background:
              'linear-gradient(to right, transparent, #c8c4bc, transparent)',
          }}
        />
      </section>

      <footer className="w-full max-w-190 px-6 pb-10">
        <div className=" text-center">
          <div className="flex items-center justify-center gap-8 text-[11px] uppercase tracking-wide text-[#8E8E8E] font-dm-sans"></div>
          <p className="mt-4 text-[11px] text-[#9A9A9A] font-dm-sans">
            © 2026 PLEK TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </footer>
    </main>
  );
};
