import React, { useState, useEffect } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { TelegramIcon, GithubIcon } from './BrandIcons';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onOpenTelegram: () => void;
  shakeTrigger?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDownload,
  onOpenTelegram,
  shakeTrigger,
}) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (shakeTrigger && shakeTrigger > 0) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 380);
      return () => clearTimeout(timer);
    }
  }, [shakeTrigger]);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 px-6 sm:px-8 max-w-7xl mx-auto overflow-visible font-feature-body">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline & Value Proposition */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Subtle Category Kicker */}
          <div
            className={`flex items-center gap-2 text-xs tracking-widest text-[#f3b775]/90 font-medium select-none transition-transform duration-150 ${
              isShaking ? 'impact-shake' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e29d52]" />
            <span className="uppercase font-feature-stat">Enter the Listening Orbit</span>
          </div>

          {/* Main Editorial Headline with Boldini Typography */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-['Boldini','Bodoni_Moda',serif] font-normal tracking-tight text-white leading-[1.06] select-none text-balance transition-transform duration-150 ${
              isShaking ? 'impact-shake' : ''
            }`}
          >
            Your night.
            <br />
            <span className="italic font-normal text-[#f3b775]">Our frequency.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-300/90 max-w-xl font-normal leading-relaxed text-balance">
            A beautifully simple music experience for late-night listeners, curious minds,
            and every song that pulls you a little further out. Built with bit-perfect lossless
            playback, dynamic Material 3 design, and zero telemetry.
          </p>

          {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-feature-stat tracking-wider pt-1 select-none">
            <span className="text-[#e29d52]">OPEN SOURCE</span>
            <span aria-hidden="true" className="text-neutral-600">•</span>
            <span>BUILT FOR ANDROID</span>
            <span aria-hidden="true" className="text-neutral-600">•</span>
            <span className="text-white font-medium">V1.4.09</span>
            <span aria-hidden="true" className="text-neutral-600">•</span>
            <span className="text-neutral-400">BIT-PERFECT FLAC</span>
          </div>

          {/* Primary Quick Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-3 select-none">
            <button
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#e29d52] hover:bg-[#f3b775] text-neutral-950 font-semibold text-sm shadow-xl shadow-[#e29d52]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-feature-body"
            >
              <Download className="w-4 h-4" />
              <span>Download v1.4.09 APK</span>
            </button>
            <button
              onClick={onOpenTelegram}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 font-medium text-sm transition-all cursor-pointer font-feature-body group"
            >
              <TelegramIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
              <span>Join Telegram</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Perspective Tilt Action Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4 z-10">
          {/* Telegram Action Card with Official Branding */}
          <TiltCard
            onClick={onOpenTelegram}
            tiltMax={9}
            className="cursor-pointer bg-[#14121a]/85 border border-[#24A1DE]/25 hover:border-[#24A1DE]/60 shadow-2xl backdrop-blur-xl p-5 sm:p-6 transition-all group rounded-2xl hover:shadow-[0_16px_36px_-8px_rgba(36,161,222,0.25)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <TelegramIcon className="w-full h-full" />
                  </div>
                  <span className="text-lg font-semibold text-white group-hover:text-[#24A1DE] transition-colors font-feature-body">
                    Telegram
                  </span>
                </div>
                <p className="text-xs text-neutral-300/80 leading-relaxed font-feature-body">
                  Join our official broadcast channel and discussion group. Get direct developer updates, beta channel builds, and feature voting.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-feature-stat text-[#24A1DE] pt-1">
                  <span>Join the service</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span aria-hidden="true" className="text-neutral-600">•</span>
                  <span className="text-neutral-400">18.4k members</span>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* GitHub APK Action Card with Official Branding */}
          <TiltCard
            onClick={onOpenDownload}
            tiltMax={9}
            className="cursor-pointer bg-[#14121a]/85 border border-white/15 hover:border-white/40 shadow-2xl backdrop-blur-xl p-5 sm:p-6 transition-all group rounded-2xl hover:shadow-[0_16px_36px_-8px_rgba(255,255,255,0.15)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#181717] border border-white/20 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-white">
                    <GithubIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white group-hover:text-neutral-200 transition-colors font-feature-body">
                    GitHub
                  </span>
                </div>
                <p className="text-xs text-neutral-300/80 leading-relaxed font-feature-body">
                  Direct standalone APK downloads, full source code under GPL v3, verified SHA-256 release checksums, and issue tracker.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-feature-stat text-[#f3b775] pt-1">
                  <span>Get the latest APK</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span aria-hidden="true" className="text-neutral-600">•</span>
                  <span className="text-white font-medium">v1.4.09</span>
                  <span aria-hidden="true" className="text-neutral-600">•</span>
                  <span className="text-neutral-400">Latest Stable</span>
                </div>
              </div>
              <div className="shrink-0 p-2.5 rounded-xl bg-white/10 border border-white/15 text-white group-hover:bg-[#e29d52] group-hover:text-neutral-950 group-hover:scale-110 transition-all shadow-md">
                <Download className="w-4 h-4" />
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
