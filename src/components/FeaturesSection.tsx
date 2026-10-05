import React, { useState } from 'react';
import {
  Download,
  Sparkles,
} from 'lucide-react';
import { TiltCard } from './TiltCard';

export type ThemeKey = 'aurora' | 'deep-ocean' | 'starlight';

interface ThemePreset {
  id: ThemeKey;
  name: 'Aurora' | 'Deep Ocean' | 'Starlight';
  primary: string;
  secondary: string;
  glowColor: string;
  cardBg: string;
  cardBorder: string;
  boxShadow: string;
  className: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    primary: '#10b981',
    secondary: '#06b6d4',
    glowColor: 'rgba(16, 185, 129, 0.28)',
    cardBg: 'rgba(7, 21, 17, 0.88)',
    cardBorder: 'rgba(16, 185, 129, 0.45)',
    boxShadow: '0 20px 50px -10px rgba(16, 185, 129, 0.35), 0 0 32px 2px rgba(6, 182, 212, 0.22)',
    className: 'theme-aurora',
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    primary: '#2563eb',
    secondary: '#3b82f6',
    glowColor: 'rgba(37, 99, 235, 0.28)',
    cardBg: 'rgba(9, 17, 32, 0.88)',
    cardBorder: 'rgba(37, 99, 235, 0.45)',
    boxShadow: '0 20px 50px -10px rgba(37, 99, 235, 0.35), 0 0 32px 2px rgba(59, 130, 246, 0.22)',
    className: 'theme-deep-ocean',
  },
  {
    id: 'starlight',
    name: 'Starlight',
    primary: '#e29d52',
    secondary: '#f3b775',
    glowColor: 'rgba(226, 157, 82, 0.25)',
    cardBg: 'rgba(18, 17, 23, 0.88)',
    cardBorder: 'rgba(226, 157, 82, 0.45)',
    boxShadow: '0 20px 50px -10px rgba(226, 157, 82, 0.35), 0 0 32px 2px rgba(243, 183, 117, 0.22)',
    className: 'theme-starlight',
  },
];

interface FeaturesSectionProps {
  onOpenDownload?: () => void;
  onOpenTelegram?: () => void;
  selectedTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenDownload,
  selectedTheme: selectedThemeKey,
  onThemeChange,
}) => {
  // Card 1 state: APK Channel
  const [selectedChannel, setSelectedChannel] = useState<'stable' | 'beta'>('stable');

  const selectedTheme = THEME_PRESETS.find((theme) => theme.id === selectedThemeKey) ?? THEME_PRESETS[2];

  // Card 3 state: Lossless Audio vs Standard
  const [fidelityMode, setFidelityMode] = useState<'lossless' | 'standard'>('lossless');

  return (
    <section id="features" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto relative z-10 font-feature-body">
      {/* Section Header */}
      <div className="space-y-4 mb-16 max-w-2xl font-feature-body">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#f3b775] font-feature-stat select-none">
          <Sparkles className="w-3.5 h-3.5 text-[#e29d52]" />
          <span>✦ PIXEL MUSIC OFFICIAL</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-feature-body font-bold tracking-tight text-white leading-tight text-balance">
          Crafted for sound.
          <br />
          <span className="italic font-normal text-[#f3b775]">Engineered for freedom.</span>
        </h2>
        <p className="text-sm sm:text-base font-feature-body text-neutral-300 leading-relaxed text-balance">
          Discover the core capabilities that make PixelMusic the ultimate late-night companion.
          Pure Android design, ad-free streaming, and true lossless reproduction.
        </p>
      </div>

      {/* Grid of Core Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Feature 1: Latest APK releases & updates (🗳️) */}
        <TiltCard
          tiltMax={6}
          className="feature-theme-card bg-[#121117]/85 border border-[#e29d52]/20 hover:border-[#f3b775]/40 shadow-2xl backdrop-blur-xl p-7 pt-10 flex flex-col justify-between font-feature-body rounded-2xl transition-all duration-300"
        >
          <div className="space-y-5">
            {/* Header with increased top breathing space */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="font-feature-stat text-xs tracking-wider text-neutral-400">01 / RELEASE</span>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                🗳️
              </div>
            </div>

            <div>
              <h3 className="font-boldini text-2xl leading-none text-white tracking-[0.01em] mb-1.5 flex items-center gap-2">
                Latest APK releases & updates
              </h3>
              <p className="font-feature-body text-xs text-neutral-300 leading-relaxed">
                Direct standalone Android installation packages built via automated GitHub CI/CD with verified SHA-256 integrity.
              </p>
            </div>

            {/* Interactive Channel Picker */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-feature-body text-neutral-400 text-[11px]">Distribution Channel</span>
                <span className="font-feature-stat text-[#f3b775] text-[10px] font-medium">
                  {selectedChannel === 'stable' ? 'v1.4.09 Stable' : 'v1.5.0-beta.2 Nightly'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/5 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setSelectedChannel('stable')}
                  className={`py-1.5 rounded transition-all cursor-pointer font-feature-body ${
                    selectedChannel === 'stable'
                      ? 'bg-[#e29d52] text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Stable Build
                </button>
                <button
                  onClick={() => setSelectedChannel('beta')}
                  className={`py-1.5 rounded transition-all cursor-pointer font-feature-body ${
                    selectedChannel === 'beta'
                      ? 'bg-neutral-700 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Nightly Beta
                </button>
              </div>

              <div className="font-feature-stat text-[11px] text-neutral-400 flex items-center justify-between pt-1">
                <span>Architecture: Universal (arm64/x86)</span>
                <span className="text-white font-semibold">18.4 MB</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={onOpenDownload}
              className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-feature-body font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#e29d52]" />
              <span>Get Latest APK</span>
            </button>
          </div>
        </TiltCard>

        {/* Feature 2: Modern Material 3 (🎵) - Dynamic CSS Variable & Class Logic */}
        <TiltCard
          tiltMax={6}
          className={`${selectedTheme.className} theme-card-container relative p-7 pt-10 flex flex-col justify-between font-feature-body rounded-2xl backdrop-blur-xl border transition-all duration-500 ease-out overflow-hidden`}
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderColor: 'var(--theme-border)',
            boxShadow: 'var(--theme-shadow)',
          }}
        >
          {/* Top-Right Ambient Glow that morphs dynamically via CSS variable */}
          <div
            className="theme-card-ambient-glow absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-500 ease-out"
            style={{
              backgroundColor: 'var(--theme-glow)',
            }}
          />

          {/* Bottom-Left Ambient Glow */}
          <div
            className="theme-card-ambient-glow absolute -bottom-24 -left-24 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-500 ease-out opacity-75"
            style={{
              backgroundColor: 'var(--theme-glow)',
            }}
          />

          <div className="space-y-5 relative z-10">
            {/* Header with increased top breathing space */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="font-feature-stat text-xs tracking-wider text-neutral-400">02 / DESIGN</span>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                🎵
              </div>
            </div>

            <div>
              <h3 className="font-boldini text-2xl leading-none text-white tracking-[0.01em] mb-1.5">
                Modern Material 3
              </h3>
              <p className="font-feature-body text-xs text-neutral-300 leading-relaxed">
                Dynamic algorithmic color extraction from album artwork and nocturnal wallpaper tones with smooth spring physics.
              </p>
            </div>

            {/* Interactive Theme Palette Selector with Aurora, Deep Ocean, and Starlight */}
            <div
              className="p-3.5 rounded-xl border transition-all duration-500 space-y-3"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-feature-body text-neutral-300 text-[11px]">Dynamic Color Harmony</span>
                <span
                  className="font-feature-stat text-[11px] font-semibold transition-colors duration-300"
                  style={{ color: 'var(--theme-secondary)' }}
                >
                  {selectedTheme.name}
                </span>
              </div>

              {/* Theme Buttons: "Aurora", "Deep Ocean", "Starlight" */}
              <div className="grid grid-cols-3 gap-2">
                {THEME_PRESETS.map((t) => {
                  const isSelected = selectedTheme.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onThemeChange(t.id)}
                      className={`py-2 px-2 rounded-lg text-xs font-feature-stat font-medium flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-offset-[#070709] font-bold shadow-md scale-[1.02]'
                          : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/25 bg-white/5'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: t.primary,
                              borderColor: t.secondary,
                              color: t.id === 'starlight' ? '#000000' : '#ffffff',
                              boxShadow: `0 0 16px ${t.primary}55`,
                            }
                          : undefined
                      }
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0 transition-transform duration-300"
                        style={{
                          backgroundColor: isSelected
                            ? t.id === 'starlight'
                              ? '#000000'
                              : '#ffffff'
                            : t.primary,
                        }}
                      />
                      <span className="truncate text-[11px]">{t.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="font-feature-stat text-[10px] text-neutral-400 flex items-center justify-between pt-0.5">
                <span>Material You Theming</span>
                <span
                  className="font-semibold transition-colors duration-300"
                  style={{ color: 'var(--theme-secondary)' }}
                >
                  Android 12–15
                </span>
              </div>
            </div>
          </div>

        </TiltCard>

        {/* Feature 3: Lossless audio & premium features (🎚️) */}
        <TiltCard
          tiltMax={6}
          className="feature-theme-card bg-[#121117]/85 border border-[#e29d52]/20 hover:border-[#f3b775]/40 shadow-2xl backdrop-blur-xl p-7 pt-10 flex flex-col justify-between font-feature-body rounded-2xl transition-all duration-300"
        >
          <div className="space-y-5">
            {/* Header with increased top breathing space */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="font-feature-stat text-xs tracking-wider text-neutral-400">03 / AUDIO ENGINE</span>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                🎚️
              </div>
            </div>

            <div>
              <h3 className="font-boldini text-2xl leading-none text-white tracking-[0.01em] mb-1.5">
                Lossless audio & premium features
              </h3>
              <p className="font-feature-body text-xs text-neutral-300 leading-relaxed">
                Bit-perfect DAC pass-through for FLAC, ALAC, WAV, and DSD with native 24-bit/192kHz precision. All premium features unlocked.
              </p>
            </div>

            {/* Interactive Lossless Engine Comparator */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-feature-body text-neutral-400 text-[11px]">Audio Fidelity Pipeline</span>
                <span className="font-feature-stat text-[#f3b775] text-[10px] font-medium">
                  {fidelityMode === 'lossless' ? 'FLAC 24-bit / 192 kHz' : 'MP3 128 kbps (Compressed)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/5 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setFidelityMode('lossless')}
                  className={`py-1.5 rounded transition-all cursor-pointer font-feature-body ${
                    fidelityMode === 'lossless'
                      ? 'bg-[#e29d52] text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Bit-Perfect Pass
                </button>
                <button
                  onClick={() => setFidelityMode('standard')}
                  className={`py-1.5 rounded transition-all cursor-pointer font-feature-body ${
                    fidelityMode === 'standard'
                      ? 'bg-neutral-700 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Lossy Stream
                </button>
              </div>

              {/* Dynamic waveform visualizer comparison */}
              <div className="flex items-end justify-between gap-1 h-9 px-2 pt-2 bg-black/50 rounded-lg">
                {Array.from({ length: 14 }).map((_, i) => {
                  const heightPercent =
                    fidelityMode === 'lossless'
                      ? Math.min(100, Math.max(25, Math.sin(i * 0.6) * 45 + 55))
                      : Math.min(100, Math.max(10, Math.sin(i * 0.4) * 20 + 25));

                  return (
                    <div
                      key={i}
                      className={`waveform-bar w-full rounded-t ${
                        fidelityMode === 'lossless'
                          ? 'waveform-bar-lossless bg-gradient-to-t from-[#e29d52] to-[#f3b775]'
                          : 'waveform-bar-compressed bg-neutral-600'
                      }`}
                      style={{
                        height: `${heightPercent}%`,
                        animationDelay: `${i * 65}ms`,
                        animationDuration: `${1.8 + (i % 5) * 0.12}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
