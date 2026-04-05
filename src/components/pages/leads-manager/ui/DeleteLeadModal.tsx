import { useModal } from '@/context/ModalContext.tsx';
import { Trash2 } from 'lucide-react';

interface Props {
  businessName: string;
  onConfirm: () => void;
}

export const DeleteLeadModal = ({ businessName, onConfirm }: Props) => {
  const modal = useModal();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div
        className={
          'w-12 h-12 rounded-full bg-[#F6F3EF] flex items-center justify-center'
        }
      >
        <Trash2 className="text-[#57534E]" size={20} />
      </div>

      <h2 className="text-xl text-[#1C1C1A] font-bold font-cormorant text-center">
        Eliminar lead
      </h2>
      <p className="text-[#78716C] text-center text-[11px] leading-relaxed">
        ¿Estás seguro de que deseas eliminar permanentemente a{' '}
        <span className="font-medium text-[#162C14]">{businessName}</span>?
        Todos los datos y el historial de este contacto se perderán.
        <br />
        <span className="mt-1 inline-block">
          Esta acción no se puede deshacer.
        </span>
      </p>
      <div className="flex gap-2 text-sm w-full">
        <button
          className="flex-1 px-4 py-2 rounded-lg text-[#576153] hover:bg-[#F6F3EF] transition-colors"
          onClick={modal.close}
        >
          Cancelar
        </button>
        <button
          className="flex-1 px-4 py-2 rounded-lg bg-[#BA1A1A] text-white hover:bg-[#9B1515] transition-colors"
          onClick={() => {
            onConfirm();
            modal.close();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
