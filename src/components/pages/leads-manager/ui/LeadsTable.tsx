import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MessageCircleCheck, Pencil, Trash } from 'lucide-react';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import { VOLUME_PURCHASE } from '@/components/share/constants.ts';
import {
  calculateScore,
  getPriority,
} from '@/components/pages/leads-manager/lib/scoreLeads.ts';
import { useModal } from '@/context/ModalContext.tsx';
import { DeleteLeadModal } from '@/components/pages/leads-manager/ui/DeleteLeadModal.tsx';

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const PAGE_SIZE = 10;

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');

  pages.push(total);

  return pages;
}

const PRIORITY_STYLES = {
  alta: 'bg-[#4A7C59] text-[#FFFFFF]',
  media: 'bg-[#CEEAC6] text-[#000000]',
  baja: 'bg-[#C3C8C0] text-[#000000]',
};

interface Props {
  leads: Lead[];
  onDelete: (id: string) => void;
}

export function LeadsTable({ leads, onDelete }: Props) {
  const [page, setPage] = useState(1);
  const modal = useModal();

  const totalPages = Math.max(1, Math.ceil(leads.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, leads.length);
  const paginated = leads.slice(start, end);

  const pageRange = getPageRange(safePage, totalPages);

  return (
    <div className="flex flex-col font-dm-sans  rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F6F3EF]/50">
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Puntaje
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Empresa
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Contacto
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Fecha
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Volumen
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Estado
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#A8A29E] uppercase text-xs tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-[#A8A29E] text-sm"
                >
                  No hay leads para mostrar.
                </td>
              </tr>
            ) : (
              paginated.map((lead) => {
                const score = calculateScore(lead);
                const priority = getPriority(score);
                const contacted = !!lead.contactedAt;

                return (
                  <tr
                    key={lead.id}
                    className="border-b border-neutral-100 last:border-0 bg-white transition-colors hover:bg-[#F6F3EF]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={twMerge(
                            'rounded-full px-3 py-1 text-xs font-medium flex items-center justify-center',
                            PRIORITY_STYLES[priority],
                          )}
                        >
                          {score}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[#162C14]">
                          {lead.businessName}
                        </p>
                        <p className="text-xs text-[#A8A29E] font-light">
                          {lead.fullName}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[#162C14]">
                          {lead.whatsapp}
                        </p>
                        <p className="text-xs text-[#A8A29E] font-light">
                          sin_emails_en_formulario@gmail.com
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-[#162C14] whitespace-nowrap">
                      {dateFormatter.format(new Date(lead.createdAt))}
                    </td>

                    <td className="px-4 py-3 text-[#78716C] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EBE8E4] px-2.5 py-1 text-xs font-medium text-black">
                        {VOLUME_PURCHASE[
                          lead.volumePurchase as keyof typeof VOLUME_PURCHASE
                        ] ?? lead.volumePurchase}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {contacted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#B8D4BE] px-2.5 py-1 text-xs font-medium text-[#162C14] uppercase">
                          Contactado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F4EF] px-2.5 py-1 text-xs font-medium text-[#78716C] uppercase whitespace-nowrap">
                          En espera
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 flex items-center gap-2">
                      <button>
                        <MessageCircleCheck
                          size={16}
                          className="text-[#78716C] hover:text-[#162C14] transition-colors"
                        />
                      </button>

                      <button>
                        <Pencil
                          size={16}
                          className="text-[#78716C] hover:text-[#162C14] transition-colors"
                        />
                      </button>

                      <button
                        onClick={() =>
                          modal.open({
                            render: (
                              <DeleteLeadModal
                                businessName={lead.businessName}
                                onConfirm={() => onDelete(lead.id)}
                              />
                            ),
                            size: 'sm',
                            showCloseButton: false,
                          })
                        }
                      >
                        <Trash
                          size={16}
                          className="text-[#78716C] hover:text-[#162C14] transition-colors"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-3 text-sm text-[#A8A29E] bg-[#FDFDFC] border-t border-[#F6F3EF]">
        <span className={'uppercase tracking-wide text-xs'}>
          Mostrando {leads.length === 0 ? 0 : start + 1}–{end} de {leads.length}{' '}
          leads
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {pageRange.map((item, i) =>
              item === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-[#A8A29E]">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={twMerge(
                    'h-8 w-8 rounded-lg text-sm font-medium transition-colors',
                    safePage === item
                      ? 'bg-[#6B9E7A] text-white'
                      : 'text-[#162C14] hover:bg-[#F6F3EF]',
                  )}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
