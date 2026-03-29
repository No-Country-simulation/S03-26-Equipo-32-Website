import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section
      className="grid grid-cols-2 min-h-[calc(100vh-72px)] bg-cover bg-center"
      style={{ backgroundImage: "url('/landing/texture.png')" }}
    >
      {/* Left - Content */}
      <div className="flex flex-col justify-center px-10 py-16 max-w-xl ml-auto mr-0 font-newsreader">
        <div className="flex items-center gap-1 font-dm-sans text-[#934B19] uppercase text-xs mb-6">
          <div>Regalos Corporativos</div>
          <div>|</div>
          <div>Productos para tu tienda</div>
        </div>

        <h1 className="text-6xl leading-tight font-semibold">
          Productos de piel <em className="italic font-light">origami</em>.
          Mayoreo directo.
        </h1>

        <p className="mt-6 text-md leading-relaxed text-[#43493D] max-w-md font-inter">
          Artículos diferenciados, certificados y personalizables con tu marca.
          Fabricados en León, Guanajuato, sin intermediarios.
        </p>

        <div
          className={
            'flex gap-1 mt-6 text-[#9FAD8E] text-[11px] uppercase tracking-wide font-dm-sans'
          }
        >
          <div>EXPOSICIÓN SAPICA</div>
          <div>·</div>
          <div>CERTIFICADO LWG</div>
          <div>·</div>
          <div>USAID PRO - INTEGRIDAD</div>
        </div>

        <button className="mt-10 self-start bg-[#173901] text-white text-sm tracking-wide rounded-sm px-8 py-3 hover:bg-[#1e4a02] transition-colors cursor-pointer flex flex-row items-center justify-between gap-2 font-dm-sans">
          Solicita tu cotización <ArrowRight className={'size-4'} />
        </button>
      </div>

      {/* Right - Product Image */}
      <div className="relative overflow-hidden">
        <img
          src="/landing/carteras_leather.png"
          alt="Productos de piel Plek"
          className="absolute top-0 right-0 w-full h-full object-contain object-right"
        />
      </div>
    </section>
  );
};
