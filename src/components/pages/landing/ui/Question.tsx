import { useState } from 'react';

export const Question = ({
  defaultOpenStatus,
  question,
  answer,
}: {
  defaultOpenStatus: boolean;
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpenStatus);
  return (
    <div className={'bg-white rounded-md border-[#E5E5E5] px-5'}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          'w-full flex items-center justify-between py-5 text-left cursor-pointer'
        }
      >
        <span className={'font-medium text-[#1a1a1a] font-dm-sans'}>
          {question}
        </span>
        <span
          className={'text-2xl text-[#2D5016] ml-4 flex-shrink-0 leading-none'}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
        style={{ maxHeight: isOpen ? 500 : 0 }}
      >
        <p className={'text-[#6B6B6B] text-sm leading-relaxed font-dm-sans'}>
          {answer}
        </p>
      </div>
    </div>
  );
};
