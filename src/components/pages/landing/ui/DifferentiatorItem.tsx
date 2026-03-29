interface DifferentiatorItemProps {
  title: string;
  subtitle: string;
  description: string;
}

export const DifferentiatorsItem = ({
  title,
  subtitle,
  description,
}: DifferentiatorItemProps) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'w-12 h-0.25 bg-[#8B4513]'} />
      <div
        className={'border border-[#8B4513] text-[#8B4513] p-1 w-fit text-xs'}
      >
        {title}
      </div>
      <h3 className={'text-xl font-cormorant font-light'}>{subtitle}</h3>
      <p className={'text-sm text-gray-600 max-w-xs'}>{description}</p>
    </div>
  );
};
