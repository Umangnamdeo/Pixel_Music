import React from 'react';
import { TelegramIcon, GithubIcon } from './BrandIcons';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenTelegram: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, onOpenTelegram }) => {
  return (
    <footer className="relative z-10 border-t border-[#e29d52]/15 py-12 px-6 sm:px-8 max-w-7xl mx-auto font-feature-body">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Motto & Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold tracking-tight text-white text-base">
            <img
              src="/logo.png"
              alt="PixelMusic Logo"
              className="w-5 h-5 rounded-md shadow-sm border border-white/10 shrink-0"
            />
            <span className="font-feature-body">PixelMusic</span>
          </div>
          <span className="hidden sm:inline text-neutral-600 font-feature-stat">/</span>
          <span className="text-neutral-400 font-['Newsreader',serif] italic text-sm">
            Made for one who listen closer
          </span>
        </div>

        {/* Center: Clean Text Links */}
        <div className="flex items-center gap-6 text-xs text-neutral-400">
          <button
            onClick={onOpenTelegram}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer group"
          >
            <TelegramIcon className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
            <span>Telegram</span>
          </button>
          <a
            href="https://github.com/ianshulyadav/PixelMusicApp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            <GithubIcon className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" />
            <span>GitHub</span>
          </a>
          <button
            onClick={onOpenDownload}
            className="hover:text-[#f3b775] transition-colors cursor-pointer"
          >
            Releases
          </button>
        </div>

        {/* Right: Copyright */}
        <div className="text-[11px] font-feature-stat text-neutral-500">
          © 2024–2026 PIXELMUSIC • GNU GPL v3.0
        </div>
      </div>
    </footer>
  );
};
