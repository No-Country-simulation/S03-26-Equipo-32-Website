import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react';
import type { Lead } from '@/core/leads/entities/lead.entity.ts';
import { VOLUME_PURCHASE } from '@/components/share/constants.ts';
import {
  calculateScore,
  getPriority,
} from '@/components/pages/leads-manager/lib/scoreLeads.ts';
import { useModal } from '@/context/ModalContext.tsx';
import { DeleteLeadModal } from '@/components/pages/leads-manager/ui/DeleteLeadModal.tsx';
import { LeadDetailSheet } from '@/components/pages/leads-manager/ui/LeadDetailSheet.tsx';
import { WhatsAppIcon } from '@/components/share/ui/WhatsAppIcon.tsx';

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
});

const formatShortDate = (date: Date) =>
  shortDateFormatter.format(date).toUpperCase().replace('.', '');

const BUSINESS_TYPE_SHORT: Record<string, string> = {
  BOUTIQUE: 'Boutique',
  WHOLESALER: 'Distribuidor',
  STORE_GIFTS: 'T. Regalos',
  STORE_CORPORATE_GIFT: 'Regalo Corp.',
  OTHER: 'Otro',
};

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
  onContact: (lead: Lead) => void;
  onMarkContacted: (lead: Lead) => Promise<void>;
  onMarkPending: (lead: Lead) => Promise<void>;
}

export function LeadsTable({
  leads,
  onDelete,
  onContact,
  onMarkContacted,
  onMarkPending,
}: Props) {
  const [page, setPage] = useState(1);
  const modal = useModal();

  const totalPages = Math.max(1, Math.ceil(leads.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, leads.length);
  const paginated = leads.slice(start, end);

  const pageRange = getPageRange(safePage, totalPages);

  const openDetail = (lead: Lead) =>
    modal.open({
      render: (
        <LeadDetailSheet
          lead={lead}
          onContact={onContact}
          onMarkContacted={onMarkContacted}
          onMarkPending={onMarkPending}
          onDelete={() => onDelete(lead.id)}
        />
      ),
      showCloseButton: false,
      variant: 'sheet-right',
    });

  return (
    <div className="flex flex-col font-dm-sans rounded-lg overflow-hidden">
      {/* ── Mobile card view ── */}
      <div className="sm:hidden bg-white rounded-lg overflow-hidden">
        {paginated.length === 0 ? (
          <p className="px-4 py-10 text-center text-[#A8A29E] text-sm">
            No hay leads para mostrar.
          </p>
        ) : (
          <div className="divide-y divide-neutral-100">
            {paginated.map((lead) => {
              const score = calculateScore(lead);
              const priority = getPriority(score);
              const contacted = !!lead.contactedAt;

              return (
                <button
                  key={lead.id}
                  type="button"
                  className="flex items-center gap-3 px-4 py-3 w-full text-left active:bg-[#F6F3EF] transition-colors"
                  onClick={() => openDetail(lead)}
                >
                  <span
                    className={twMerge(
                      'size-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                      PRIORITY_STYLES[priority],
                    )}
                  >
                    {score}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-[#162C14] text-sm truncate">
                        {lead.businessName}
                      </p>
                      {contacted ? (
                        <span className="inline-flex rounded-full bg-[#4A7C59] px-2.5 py-0.5 text-xs font-medium text-white uppercase whitespace-nowrap shrink-0">
                          Contactado
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-[#D1CFC9] px-2.5 py-0.5 text-xs font-medium text-[#78716C] uppercase whitespace-nowrap shrink-0">
                          En espera
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-[#A8A29E]">
                        {BUSINESS_TYPE_SHORT[lead.businessType] ??
                          lead.businessType}
                      </p>
                      <p className="text-xs text-[#A8A29E]">
                        {formatShortDate(new Date(lead.createdAt))}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 py-3 border-t border-[#F6F3EF]">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#162C14] hover:bg-[#F6F3EF] disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

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

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#162C14] hover:bg-[#F6F3EF] disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Desktop table view ── */}
      <div className="hidden sm:block overflow-x-auto">
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
                          {lead.email || '-'}
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
                      <button onClick={() => onContact(lead)}>
                        <WhatsAppIcon className="size-5 text-[#78716C] hover:text-[#162C14] transition-colors" />
                      </button>

                      <button onClick={() => openDetail(lead)}>
                        <Eye
                          size={20}
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
                        <Trash2
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

      <div className="hidden sm:flex items-center justify-between p-3 text-sm text-[#A8A29E] bg-[#FDFDFC] border-t border-[#F6F3EF]">
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
