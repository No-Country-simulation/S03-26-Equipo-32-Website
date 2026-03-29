import { MessageCircle } from 'lucide-react';
import { Question } from '@/components/pages/landing/ui/Question.tsx';
import { FAQ_QUESTIONS } from '@/components/share/constants.ts';

export const FAQ = () => {
  return (
    <div className="py-16">
      <div className={'max-w-6xl mx-auto w-full'}>
        <div className={'grid grid-cols-12 items-center gap-10'}>
          <div className={'col-span-4 flex flex-col gap-4'}>
            <div className={'text-[#8B4513] text-xs uppercase'}>FAQ</div>

            <div className={'font-cormorant text-4xl'}>
              Preguntas frecuentes
            </div>

            <p className={'text-[#6B6B6B]'}>
              ¿No encontraste lo que buscas? Escríbenos directamente.
            </p>

            <div
              className={
                'flex flex-row gap-2 items-center text-[#2D5016] font-semibold'
              }
            >
              <MessageCircle className={'size-4'} strokeWidth={2} />
              Escríbenos por WhatsApp
            </div>
          </div>

          <div className={'col-span-8 flex flex-col gap-4'}>
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
