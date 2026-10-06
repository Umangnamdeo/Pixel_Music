import React from 'react';
import { ArrowUp, BookOpen, Download, ExternalLink, Github, MessageCircle, Palette, Shield, Sparkles } from 'lucide-react';
import { TelegramIcon } from './BrandIcons';
import { THEME_PRESETS, type ThemeKey } from './FeaturesSection';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenTelegram: () => void;
  selectedTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

const REPOSITORY_URL = 'https://github.com/ianshulyadav/PixelMusicApp';

export const Footer: React.FC<FooterProps> = ({
  onOpenDownload,
  onOpenTelegram,
  selectedTheme,
  onThemeChange,
}) => {
  const selectedThemeIndex = THEME_PRESETS.findIndex((theme) => theme.id === selectedTheme);
  const nextTheme = THEME_PRESETS[(selectedThemeIndex + 1) % THEME_PRESETS.length];
  const accentColor = selectedTheme === 'solar-bronze' ? '#bc7a3e' : selectedTheme === 'deep-orbit' ? '#d97706' : '#f59e0b';

  return (
    <footer className="relative z-10 mx-auto mb-4 w-[calc(100%-2rem)] max-w-7xl rounded-[2rem] border border-amber-500/15 bg-[#100e13]/80 px-6 py-10 font-feature-body shadow-[0_0_35px_rgba(226,157,82,0.06)] backdrop-blur-xl sm:mb-6 sm:px-10 sm:py-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="/" className="group inline-flex items-center gap-2.5 text-white transition-all duration-300 ease-out hover:scale-[1.02] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b775]">
            <img src="/logo.png" alt="PixelMusic Logo" className="h-8 w-8 rounded-xl border border-white/10" />
            <span className="font-['Boldini','Bodoni_Moda',serif] text-xl">PixelMusic</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
            A night-sky soundtrack for your local, streaming, and cloud music.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenTelegram}
              aria-label="Open PixelMusic Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-amber-500/35 hover:bg-amber-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]"
            >
              <TelegramIcon className="h-4 w-4" />
            </button>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PixelMusic on GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-amber-500/35 hover:bg-amber-500/10 hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]"
            >
              <Github className="h-4 w-4" />
            </a>
            <span
              aria-label="Discord community coming soon"
              title="Discord community coming soon"
              className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-600"
            >
              <MessageCircle className="h-4 w-4" />
            </span>
          </div>
          <button
            type="button"
            onClick={() => onThemeChange(nextTheme.id)}
            aria-label={`Change accent from ${THEME_PRESETS[selectedThemeIndex]?.name ?? 'Starlight'} to ${nextTheme.name}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-black/20 px-3.5 py-2 text-xs text-amber-100/75 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-amber-400/45 hover:text-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]"
          >
            <Palette className="h-3.5 w-3.5 text-[#e29d52]" />
            <span>Accent: {THEME_PRESETS[selectedThemeIndex]?.name ?? 'Starlight'}</span>
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(226,157,82,0.6)]" style={{ backgroundColor: accentColor }} />
          </button>
        </div>

        <nav aria-label="Documentation" className="space-y-4">
          <h2 className="font-feature-stat text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200/75">Docs</h2>
          <a href={`${REPOSITORY_URL}#readme`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <BookOpen className="h-3.5 w-3.5" /> Getting started
          </a>
          <a href="#features" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <Sparkles className="h-3.5 w-3.5" /> Features
          </a>
          <a href={`${REPOSITORY_URL}/issues`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <ExternalLink className="h-3.5 w-3.5" /> Help & troubleshooting
          </a>
        </nav>

        <nav aria-label="Downloads and legal" className="space-y-4">
          <h2 className="font-feature-stat text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200/75">Downloads &amp; legal</h2>
          <button type="button" onClick={onOpenDownload} className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <Download className="h-3.5 w-3.5" /> Download APK
          </button>
          <a href="#releases" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <ExternalLink className="h-3.5 w-3.5" /> GitHub releases
          </a>
          <a href={`${REPOSITORY_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <Shield className="h-3.5 w-3.5" /> GPL-3.0 license
          </a>
          <a href={`${REPOSITORY_URL}/blob/main/PRIVACY_POLICY.md`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <Shield className="h-3.5 w-3.5" /> Privacy policy
          </a>
        </nav>

        <nav aria-label="Community" className="space-y-4">
          <h2 className="font-feature-stat text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200/75">Community</h2>
          <button type="button" onClick={onOpenTelegram} className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <TelegramIcon className="h-3.5 w-3.5" /> Telegram channel
          </button>
          <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <Github className="h-3.5 w-3.5" /> GitHub source
          </a>
          <span className="flex items-center gap-2 text-sm text-neutral-600" title="Discord community coming soon">
            <MessageCircle className="h-3.5 w-3.5" /> Discord · coming soon
          </span>
          <a href={`${REPOSITORY_URL}/issues`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 transition-all duration-300 ease-out hover:scale-[1.02] hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <ExternalLink className="h-3.5 w-3.5" /> Report an issue
          </a>
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 PixelMusic · GNU GPL v3.0 · Release v1.4.09</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Umangnamdeo" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            Created by Umangnamdeo
          </a>
          <a href="#top" aria-label="Back to top" className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-100 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
