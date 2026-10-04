import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { TelegramIcon, GithubIcon } from './BrandIcons';

interface NavbarProps {
  onOpenDownload: () => void;
  onOpenTelegram: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, onOpenTelegram }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070709]/85 backdrop-blur-xl border-b border-[#e29d52]/15 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Logo & Wordmark */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5 group select-none"
        >
          <img
            src="/logo.png"
            alt="PixelMusic Logo"
            className="w-8 h-8 rounded-xl shadow-md border border-white/10 group-hover:scale-105 transition-transform shrink-0"
          />
          <span className="font-['Boldini','Bodoni_Moda',serif] font-normal tracking-wide">PixelMusic</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e29d52] group-hover:scale-125 transition-transform" />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a
            href="#features"
            className="hover:text-white transition-colors duration-150 py-1"
          >
            Features
          </a>
          <a
            href="#releases"
            className="hover:text-white transition-colors duration-150 py-1"
          >
            Releases
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenTelegram}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-200 bg-white/5 hover:bg-[#24A1DE]/20 hover:text-white border border-white/10 hover:border-[#24A1DE]/40 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer group"
          >
            <TelegramIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
            <span>Telegram</span>
          </button>
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-[#e29d52] hover:bg-[#f3b775] rounded-lg transition-all duration-150 shadow-md shadow-[#e29d52]/20 hover:shadow-[#e29d52]/40 whitespace-nowrap active:scale-95 cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Get APK</span>
            <span className="text-[10px] opacity-75 font-mono">v1.4.09</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#0c0c10] border-b border-[#e29d52]/20 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-medium text-neutral-300">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Features
            </a>
            <a
              href="#releases"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              Releases
            </a>
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTelegram();
              }}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-neutral-200 bg-white/5 rounded-lg cursor-pointer hover:bg-[#24A1DE]/20"
            >
              <TelegramIcon className="w-4 h-4 shrink-0" />
              <span>Join Telegram Community</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-950 bg-[#e29d52] rounded-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download APK v1.4.09</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
