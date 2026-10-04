import React from 'react';
import { X, Users, Radio, ExternalLink } from 'lucide-react';
import { TelegramIcon } from './BrandIcons';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0e0d13] border border-[#24A1DE]/30 shadow-2xl p-6 sm:p-7 space-y-6 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5">
          <img
            src="/logo.png"
            alt="PixelMusic Official Logo"
            className="w-12 h-12 rounded-2xl shadow-xl border border-white/10 shrink-0"
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#24A1DE]">
              <TelegramIcon className="w-3.5 h-3.5 shrink-0" />
              <span>t.me/PixelMusicApp</span>
            </div>
            <h3 className="text-xl font-bold font-feature-body text-white tracking-tight">
              Pixel Music Official
            </h3>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <Users className="w-3.5 h-3.5 text-[#24A1DE]" />
              <span>Members</span>
            </div>
            <div className="text-lg font-bold font-mono text-white tabular-nums">18,400+</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <Radio className="w-3.5 h-3.5 text-[#e29d52]" />
              <span>Nightly Drops</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">Lossless Tracks</div>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-2 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-[#f3b775]">•</span>
            <span>Early testing access to experimental builds</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#f3b775]">•</span>
            <span>Direct dialogue with lead developers & audio engineers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#f3b775]">•</span>
            <span>Curated late-night ambient, synthwave, and jazz playlists</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href="https://t.me/PixelMusicApp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-xl bg-[#24A1DE] hover:bg-[#208fca] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#24A1DE]/25 transition-all cursor-pointer"
          >
            <TelegramIcon className="w-4 h-4 shrink-0" />
            <span>Open Telegram Channel (@PixelMusicApp)</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};

