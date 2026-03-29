import { Download } from 'lucide-react';

export const PopularCatalog = () => {
  return (
    <div className="flex flex-col gap-8 py-16 bg-[#FAFAFA] ">
      <div className={'max-w-4xl mx-auto'}>
        <div className={'text-[#8B4513] text-xs'}>PRODUCTOS DESTACADOS</div>
        <div className={'font-cormorant text-4xl mt-5'}>
          Nuestras piezas más populares
        </div>

        <img
          src={'/landing/FeaturedProducts.png'}
          alt={'Productos destacados'}
          className={'w-full rounded-lg mt-15'}
        />

        <div className={'flex justify-center items-center'}>
          <button className="mt-10 self-start bg-[#173901] text-white text-sm tracking-wide rounded-sm px-8 py-3 hover:bg-[#1e4a02] transition-colors cursor-pointer flex flex-row items-center gap-2 font-dm-sans">
            <Download className={'size-3'} /> Ver catálogo completo — descarga
            gratis
          </button>
        </div>
      </div>
    </div>
  );
};
