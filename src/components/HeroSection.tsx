import React, { useEffect, useState } from 'react';
import { Download, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

interface HeroSectionProps {
  onOpenDownload: () => void;
  shakeTrigger?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDownload, shakeTrigger }) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (shakeTrigger && shakeTrigger > 0) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 380);
      return () => clearTimeout(timer);
    }
  }, [shakeTrigger]);

  return (
    <section className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center overflow-visible px-6 pb-16 pt-28 font-feature-body sm:px-8">
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="z-10 space-y-6 lg:col-span-7">
          <div
            className={`flex select-none items-center gap-2 text-xs tracking-widest text-[#f3b775]/90 transition-transform duration-150 ${
              isShaking ? 'impact-shake' : ''
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#e29d52]" />
            <span className="font-feature-stat uppercase">Enter the Listening Orbit</span>
          </div>

          <h1
            className={`select-none text-balance font-['Boldini','Bodoni_Moda',serif] text-5xl font-normal leading-[1.06] tracking-tight text-white transition-transform duration-150 sm:text-6xl md:text-7xl ${
              isShaking ? 'impact-shake' : ''
            }`}
          >
            Your night.
            <br />
            <span className="font-normal italic text-[#f3b775]">Our frequency.</span>
          </h1>

          <p className="max-w-xl text-balance text-base font-normal leading-relaxed text-neutral-300/90 sm:text-lg">
            A beautifully simple music experience for late-night listeners, curious minds,
            and every song that pulls you a little further out. Built with bit-perfect lossless
            playback, dynamic Material 3 design, and zero telemetry.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#e29d52] px-6 py-3 text-sm font-semibold text-neutral-950 shadow-xl shadow-[#e29d52]/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#f3b775] hover:shadow-[#e29d52]/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b775] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              <span>Download APK</span>
              <span className="font-feature-stat text-xs opacity-75">v1.4.09</span>
            </button>
            <a
              href="https://github.com/ianshulyadav/PixelMusicApp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-neutral-100 backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#e29d52]/45 hover:bg-[#e29d52]/10 hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b775] active:scale-[0.98]"
            >
              <GithubIcon className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </div>

          <ul aria-label="Project highlights" className="flex flex-wrap gap-x-7 gap-y-3 pt-2 text-amber-200/70">
            <li className="flex items-center gap-2 text-xs">
              <Star className="h-4 w-4 text-[#e29d52]" />
              <span>Stars on GitHub</span>
            </li>
            <li className="flex items-center gap-2 text-xs">
              <Download className="h-4 w-4 text-[#e29d52]" />
              <span>Direct APK downloads</span>
            </li>
            <li className="flex items-center gap-2 text-xs">
              <ShieldCheck className="h-4 w-4 text-[#e29d52]" />
              <span>Open source · GPL-3.0</span>
            </li>
          </ul>

          <div className="flex flex-wrap select-none items-center gap-3 pt-1 font-feature-stat text-[11px] tracking-wider text-neutral-400">
            <span className="text-[#e29d52]">BUILT FOR ANDROID</span>
            <span aria-hidden="true" className="text-neutral-600">•</span>
            <span className="text-white">BIT-PERFECT FLAC</span>
            <span aria-hidden="true" className="text-neutral-600">•</span>
            <span>ZERO TELEMETRY</span>
          </div>
        </div>
        <div aria-hidden="true" className="hidden lg:col-span-5 lg:block" />
      </div>
    </section>
  );
};
