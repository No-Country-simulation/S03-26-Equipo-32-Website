import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { statisticsContainer } from '@/core/containers/statistics.container.ts';

const slides = [
  { src: '/landing/cartera-negra-pleck.svg', alt: 'Cartera negra Pleck' },
  {
    src: '/landing/cartera-amarilla-pleck.svg',
    alt: 'Cartera amarilla Pleck',
  },
  { src: '/landing/accesorios-pleck.svg', alt: 'Accesorios Pleck' },
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export const PopularCatalog = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const index = wrap(0, slides.length, current);
  const prevIndex = wrap(0, slides.length, current - 1);
  const nextIndex = wrap(0, slides.length, current + 1);

  const paginate = useCallback((dir: number) => {
    setCurrent(([prev]) => [prev + dir, dir]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <div id="catalogo" className="flex flex-col gap-8 py-16 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto w-full px-4">
        <div className="text-[#8B4513] text-xs">PRODUCTOS DESTACADOS</div>
        <div className="font-cormorant text-4xl mt-5">
          Nuestras piezas más populares
        </div>
      </div>

      <div className="relative mt-8">
        <div className="flex items-center justify-center gap-6 px-16">
          {/* Previous slide (peek left) */}
          <div
            onClick={() => paginate(-1)}
            className="hidden md:block w-1/4 flex-shrink-0 opacity-40 cursor-pointer hover:opacity-60 transition-opacity"
          >
            <img
              src={slides[prevIndex].src}
              alt={slides[prevIndex].alt}
              className="w-full scale-90"
            />
          </div>

          {/* Active slide */}
          <div className="w-full md:w-1/2 flex-shrink-0 overflow-hidden relative h-80 md:h-96">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={current}
                src={slides[index].src}
                alt={slides[index].alt}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full absolute inset-0 object-contain h-full"
              />
            </AnimatePresence>
          </div>

          {/* Next slide (peek right) */}
          <div
            onClick={() => paginate(1)}
            className="hidden md:block w-1/4 flex-shrink-0 opacity-40 cursor-pointer hover:opacity-60 transition-opacity"
          >
            <img
              src={slides[nextIndex].src}
              alt={slides[nextIndex].alt}
              className="w-full scale-90"
            />
          </div>
        </div>

        {/* Arrow buttons: visible only on mobile, hidden from md up */}
        <button
          onClick={() => paginate(-1)}
          className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow cursor-pointer transition-colors z-10"
        >
          <ChevronLeft className="size-5 text-[#173901]" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow cursor-pointer transition-colors z-10"
        >
          <ChevronRight className="size-5 text-[#173901]" />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() =>
                setCurrent(([prev]) => [
                  i,
                  i > wrap(0, slides.length, prev) ? 1 : -1,
                ])
              }
              className={`size-2.5 rounded-full transition-colors cursor-pointer ${
                i === index ? 'bg-[#173901]' : 'bg-[#173901]/25'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => statisticsContainer.trackCatalogDownload.execute()}
          className="mt-4 bg-[#173901] text-white text-sm tracking-wide rounded-sm px-8 py-3 hover:bg-[#1e4a02] transition-colors cursor-pointer flex flex-row items-center gap-2 font-dm-sans"
        >
          <Download className="size-3" /> Ver catálogo completo
        </button>
      </div>
    </div>
  );
};
