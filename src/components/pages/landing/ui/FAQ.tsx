import { MessageCircle } from 'lucide-react';
import { Question } from '@/components/pages/landing/ui/Question.tsx';
import { FAQ_QUESTIONS } from '@/components/share/constants.ts';

const WHATSAPP_NUMBER = '5491124718183';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, quiero solicitar una cotizacion para productos de PLEK.',
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const FAQ = () => {
  return (
    <div id="faq" className="py-16 bg-[#F5F0E8]">
      <div className={'max-w-6xl mx-auto w-full px-6 md:px-10'}>
        <div className={'grid grid-cols-1 md:grid-cols-12 items-center gap-10'}>
          <div className={'md:col-span-4 flex flex-col gap-4'}>
            <div className={'text-[#8B4513] text-xs uppercase'}>FAQ</div>

            <div className={'font-cormorant text-4xl'}>
              Preguntas frecuentes
            </div>

            <p className={'text-[#6B6B6B]'}>
              ¿No encontraste lo que buscas? Escríbenos directamente.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className={
                'flex flex-row gap-2 items-center text-[#2D5016] font-semibold'
              }
            >
              <MessageCircle className={'size-4'} strokeWidth={2} />
              Escríbenos por WhatsApp
            </a>
          </div>

          <div className={'md:col-span-8 flex flex-col gap-4'}>
            {FAQ_QUESTIONS.map((item, index) => {
              return (
                <Question
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  defaultOpenStatus={index === 0}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
