import React, { useEffect, useState } from 'react';
import { Download, Eye, Menu, Package, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  onOpenDownload: () => void;
}

const navItems = [
  { href: '#preview', label: 'Preview', icon: Eye },
  { href: '#features', label: 'Features', icon: Sparkles },
  { href: '#releases', label: 'Releases', icon: Package },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-5">
      <div
        className={`relative mx-auto max-w-7xl rounded-full border border-amber-500/20 bg-[#100e13]/75 px-4 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:px-6 ${
          isScrolled ? 'bg-[#100e13]/90 shadow-black/50' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <a
            href="/"
            className="group flex shrink-0 select-none items-center gap-2.5 text-white transition-all duration-300 ease-out hover:scale-[1.02] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b775]"
          >
            <img
              src="/logo.png"
              alt="PixelMusic Logo"
              className="h-8 w-8 shrink-0 rounded-xl border border-white/10 shadow-md transition-transform group-hover:rotate-[-4deg]"
            />
            <span className="font-['Boldini','Bodoni_Moda',serif] text-lg font-normal tracking-wide sm:text-xl">PixelMusic</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#e29d52] transition-transform group-hover:scale-125" />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/5 bg-black/15 p-1 md:flex">
            {navItems.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-neutral-300 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-500/10 hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]"
              >
                <Icon className="h-3.5 w-3.5 text-amber-200/70" />
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onOpenDownload}
            className="hidden shrink-0 items-center gap-2 rounded-full bg-[#e29d52] px-4 py-2 text-xs font-semibold text-neutral-950 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b775] active:scale-[0.98] sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 text-neutral-300 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-500/10 hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775] md:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-[calc(100%+0.65rem)] space-y-1 rounded-3xl border border-amber-500/20 bg-[#100e13]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
            {navItems.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-200 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-500/10 hover:text-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]"
              >
                <Icon className="h-4 w-4 text-[#e29d52]" />
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#e29d52] px-4 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#f3b775] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775]"
            >
              <Download className="h-4 w-4" />
              Download APK
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
