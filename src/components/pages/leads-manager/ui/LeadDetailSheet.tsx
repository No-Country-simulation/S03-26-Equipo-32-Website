import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  MessageCircle,
  X,
} from 'lucide-react';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import {
  BUSINESS,
  FOUND_US,
  NEEDED_BY,
  VOLUME_PURCHASE,
} from '@/components/share/constants.ts';
import { useModal } from '@/context/ModalContext.tsx';

interface Props {
  lead: Lead;
  onContact: (lead: Lead) => void;
  onMarkContacted: (lead: Lead) => Promise<void>;
  onMarkPending: (lead: Lead) => Promise<void>;
}

const FIELD_CARD = 'rounded-xl bg-[#F6F3EF] border border-[#EFE7DE] px-3 py-2';

export const LeadDetailSheet = ({
  lead,
  onContact,
  onMarkContacted,
  onMarkPending,
}: Props) => {
  const modal = useModal();
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'en-espera' | 'contactado'>(
    lead.contactedAt ? 'contactado' : 'en-espera',
  );
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const location = useMemo(() => {
    const chunks = [lead.city, lead.region, lead.country].filter(Boolean);
    return chunks.length > 0 ? chunks.join(', ') : '-';
  }, [lead.city, lead.country, lead.region]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleStatusChange = async (value: 'en-espera' | 'contactado') => {
    if (value === status) return;

    setStatus(value);
    setStatusOpen(false);
    setSavingStatus(true);
    try {
      if (value === 'contactado') {
        await onMarkContacted(lead);
      } else {
        await onMarkPending(lead);
      }
    } catch {
      setStatus(status);
    } finally {
      setSavingStatus(false);
    }
  };

  return (
    <section className="flex h-full flex-col bg-white font-dm-sans">
      <header className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-[24px] leading-none text-[#1C1C1A] font-cormorant">
            Detalle del lead
          </h2>
        </div>
        <button
          type="button"
          onClick={modal.close}
          aria-label="Cerrar detalle"
          className="rounded-full p-2 text-[#8B8176] transition-colors hover:bg-[#F6F3EF] hover:text-[#5F574E]"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-5">
        <div className="mb-5">
          <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-[#78716C] font-dm-sans">
            Estado
          </label>
          <div ref={statusRef} className="relative">
            <button
              type="button"
              onClick={() => {
                if (!savingStatus) setStatusOpen((prev) => !prev);
              }}
              disabled={savingStatus}
              className={`flex w-full items-center justify-between px-10 py-3.5 pr-10 text-sm font-semibold transition-colors disabled:opacity-60 text-[#162C14] bg-[#F6F3EF] ${
                statusOpen ? 'rounded-t-xl rounded-b-none' : 'rounded-xl'
              }`}
            >
              <span>
                {status === 'contactado' ? 'Contactado' : 'En espera'}
              </span>
            </button>

            {status === 'contactado' ? (
              <CheckCircle2
                size={14}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#162C14]"
              />
            ) : (
              <Circle
                size={12}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#162C14]"
              />
            )}
            <ChevronDown
              size={15}
              className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#162C14] transition-transform ${
                statusOpen ? 'rotate-180' : ''
              }`}
            />

            {statusOpen && (
              <div className="absolute left-0 right-0 top-full z-20 rounded-b-xl bg-[#F7F4F0] p-1 shadow-[0_10px_20px_rgba(40,30,20,0.10)]">
                {[
                  { value: 'en-espera' as const, label: 'En espera' },
                  { value: 'contactado' as const, label: 'Contactado' },
                ].map((option) => {
                  const selected = status === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleStatusChange(option.value)}
                      disabled={savingStatus}
                      className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                        selected
                          ? 'bg-[#6B9E7A] text-white'
                          : 'bg-[#F6F3EF] text-[#162C14]'
                      }`}
                    >
                      {option.value === 'contactado' ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Circle size={12} />
                      )}
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[#78716C] font-dm-sans">
              Información de contacto
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Nombre
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {lead.fullName || '-'}
                </p>
              </div>
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Email
                </p>
                <p className="mt-1 break-all text-sm text-[#162C14]">
                  {lead.email || '-'}
                </p>
              </div>
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Empresa
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {lead.businessName || '-'}
                </p>
              </div>
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Telefono
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {lead.whatsapp || '-'}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[#78716C] font-dm-sans">
              Perfil de compra
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Tipo de negocio
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {BUSINESS[lead.businessType as keyof typeof BUSINESS] ||
                    lead.businessType ||
                    '-'}
                </p>
              </div>
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Origen
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {FOUND_US[lead.foundUs as keyof typeof FOUND_US] ||
                    lead.foundUs ||
                    '-'}
                </p>
              </div>
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Volumen estimado
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {VOLUME_PURCHASE[
                    lead.volumePurchase as keyof typeof VOLUME_PURCHASE
                  ] ||
                    lead.volumePurchase ||
                    '-'}
                </p>
              </div>
              <div className={FIELD_CARD}>
                <p className="text-[10px] uppercase tracking-widest text-[#78716C]">
                  Urgencia
                </p>
                <p className="mt-1 text-sm text-[#162C14]">
                  {NEEDED_BY[lead.neededBy as keyof typeof NEEDED_BY] ||
                    lead.neededBy ||
                    '-'}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[#78716C] font-dm-sans">
              Ubicacion
            </h3>
            <div className={FIELD_CARD}>
              <p className="text-sm text-[#3B2F24]">{location}</p>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[#78716C] font-dm-sans">
              Notas del cliente
            </h3>
            <div className="rounded-xl bg-[#F6F3EF] border border-[#EFE7DE] px-3 py-3 min-h-30">
              <p className="text-sm leading-relaxed text-[#3B2F24] whitespace-pre-wrap">
                {lead.products || 'No hay notas registradas.'}
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className="px-6 pb-4 pt-3">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onContact(lead)}
            className="inline-flex w-full max-w-45 items-center justify-center gap-2 rounded-xl bg-[#2D5A3D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#234832]"
          >
            <MessageCircle size={14} />
            Contactar
          </button>
        </div>

        <div className="mt-5 border-t border-[#EFE7DE] pt-4">
          {/* <button
            type="button"
            onClick={modal.close}
            className="text-[12px] font-dm-sans text-[#8B8176] transition-colors hover:text-[#5F574E]"
          >
            Volver
          </button> */}
        </div>
      </footer>
    </section>
  );
};
