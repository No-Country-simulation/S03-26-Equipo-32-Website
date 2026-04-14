interface HowItWorksItemProps {
  title: string;
  description: string;
  step: number;
}

export const HowItWorksItem = ({
  title,
  description,
  step,
}: HowItWorksItemProps) => {
  return (
    <div
      className={
        'flex gap-4 not-last:border-b not-last:border-b-[#CDD0BE] pb-6'
      }
    >
      <div
        className={
          'border-2 rounded-full p-3 w-10 h-10 flex justify-center items-center font-dm-sans text-[#2D5016] border-[#2D5016]'
        }
      >
        {step}
      </div>
      <div className={'flex flex-col gap-2'}>
        <div className={'font-cormorant text-[#1A1A1A] text-lg'}>{title}</div>
        <div className={'text-sm text-[#6B6B6B] max-w-xl font-dm-sans'}>
          {description}
        </div>
      </div>
    </div>
  );
};
