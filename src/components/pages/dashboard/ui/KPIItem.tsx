interface KPIItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const KPIItem = ({ icon, value, label }: KPIItemProps) => {
  return (
    <div className={'bg-white rounded-lg shadow p-4'}>
      <div
        className={
          'bg-[#4C6548]/10 text-[#4C6548] rounded-md p-2 mb-2 inline-flex items-center justify-center'
        }
      >
        {icon}
      </div>
      <h3 className={'text-3xl font-medium text-[#162C14]'}>{value}</h3>
      <p className={'text-sm text-[#A8A29E]'}>{label}</p>
    </div>
  );
};
