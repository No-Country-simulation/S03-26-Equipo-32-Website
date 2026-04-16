import { CERTIFICATIONS } from '@/components/share/constants.ts';

export const Testimonials = () => {
  return (
    <div
      id="certificaciones"
      className="flex flex-col gap-8 py-16 bg-[#FEF9F1]"
    >
      <div className={'max-w-4xl mx-auto w-full px-6 md:px-0'}>
        <div className={'grid grid-cols-1 md:grid-cols-12 gap-8'}>
          {/* Left Column */}
          <div className={'md:col-span-5 flex flex-col gap-4'}>
            <div className={'text-[#8B4513] text-semibold uppercase'}>
              Certificaciones y Alianzas
            </div>
            {CERTIFICATIONS.map((cert, index) => (
              <div key={index}>
                <div
                  className={
                    'flex flex-row gap-4 items-center mt-5 font-dm-sans font-medium pb-5' +
                    (index !== CERTIFICATIONS.length - 1
                      ? ' border-b border-gray-200'
                      : '')
                  }
                >
                  {cert.svgSrc ? (
                    <img
                      src={cert.svgSrc}
                      alt=""
                      aria-hidden="true"
                      className="size-6 shrink-0"
                    />
                  ) : (
                    <cert.icon className={'size-6 text-[#173901] shrink-0'} />
                  )}
                  <div className="flex flex-col gap-0 w-full">
                    <div
                      className="font-cormorant text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-xs md:max-w-sm lg:max-w-md"
                      title={cert.name}
                    >
                      {cert.name}
                    </div>
                    <div
                      className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs md:max-w-sm lg:max-w-md"
                      title={cert.description}
                    >
                      {cert.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div
            className={
              'md:col-span-7 flex flex-col gap-4 border-l-4 border-[#8B4513] pl-8 relative'
            }
          >
            <img
              src={'/landing/_.png'}
              alt={'Testimonial'}
              className={'size-3 absolute top-10 left-10'}
            />
            <div className={'font-dm-sans text-[#8B4513] text-xs'}>
              <p
                className={
                  'font-cormorant text-xl text-[#1A1A1A] mt-20 italic line-clamp-3'
                }
              >
                El sistema origami es un éxito en la tienda. Los clientes quedan
                fascinados con el diseño y preguntan por él de inmediato. PLEK
                nos ha ayudado a diferenciarnos de la competencia con un
                producto único y de calidad.
              </p>
              <div className={'mt-4 font-semibold text-black'}>
                María Elena Rodríguez
              </div>
              <div className={'text-[#6B6B6B]'}>
                Propietaria, Boutique Lujo · Guadalajara
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
