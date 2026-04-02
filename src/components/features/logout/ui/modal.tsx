import { useModal } from '@/context/ModalContext.tsx';
import { userContainer } from '@/core/containers/user.container.ts';

export const LogoutModal = () => {
  const modal = useModal();

  return (
    <div
      className={
        'flex flex-col items-center justify-center gap-4 p-4 bg-white rounded shadow-lg'
      }
    >
      <h2 className={'text-xl font-bold font-cormorant'}>Cerrar Sesión</h2>
      <p className={'text-[#78716C] text-center text-xs'}>
        Estás a punto de salir de tu cuenta en Plek. ¿Deseas continuar?
      </p>
      <div className={'flex gap-2 text-sm w-full max-w-xs'}>
        <button
          className={'px-4 py-2 text-[#576153] w-full rounded'}
          onClick={modal.close}
        >
          Cancelar
        </button>
        <button
          className={'px-4 py-2 bg-[#BA1A1A] text-white rounded w-full'}
          onClick={() => {
            userContainer.logout.execute();
            modal.close();
          }}
        >
          Sí, salir
        </button>
      </div>
    </div>
  );
};
