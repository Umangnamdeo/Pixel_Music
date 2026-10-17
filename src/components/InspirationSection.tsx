import React from 'react';
import { Sparkles } from 'lucide-react';

export const InspirationSection: React.FC = () => (
  <section
    aria-labelledby="inspiration-title"
    className="inspiration-section relative z-10 mx-auto w-[calc(100%-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border px-6 py-12 sm:w-[calc(100%-3rem)] sm:px-10 sm:py-16"
  >
    <div className="relative z-10 mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-center gap-2 font-feature-stat text-xs uppercase tracking-[0.18em] text-[#f3b775]">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <span>Visual inspiration</span>
      </div>
      <h2
        id="inspiration-title"
        className="text-balance text-center font-['Boldini','Bodoni_Moda',serif] text-3xl text-white sm:text-4xl"
      >
        Inspired by <span className="italic text-[#f3b775]">Material 3 UI</span>
      </h2>
      <figure className="mt-9 overflow-hidden rounded-2xl border border-white/10 bg-transparent p-2 shadow-[0_24px_70px_-28px_var(--site-page-glow)] sm:rounded-3xl sm:p-3">
        <img
          src="/images/rhythm-inspiration.png"
          alt="Rhythm music interface concept with colorful feature cards and a music player"
          className="h-auto w-full rounded-xl sm:rounded-2xl"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="px-3 pb-2 pt-4 text-center font-feature-stat text-[10px] uppercase tracking-widest text-neutral-500 sm:text-xs">
          A visual reference for the PixelMusic experience
        </figcaption>
      </figure>
    </div>
  </section>
);
