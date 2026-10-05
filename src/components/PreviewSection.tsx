import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { MaterialDialog } from './MaterialDialog';

const screenshots = [
  { title: 'Home', src: '/screenshots/home.png', description: 'Recently played and listening stats' },
  { title: 'Now Playing', src: '/screenshots/now-playing.png', description: 'Now playing with album art and controls' },
  { title: 'Library', src: '/screenshots/library.png', description: 'Your music library and albums' },
  { title: 'Explore', src: '/screenshots/explore.png', description: 'Explore music, quick picks, and playlists' },
];

export const PreviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeScreenshot = screenshots[activeIndex];

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + screenshots.length) % screenshots.length);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % screenshots.length);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, showNext, showPrevious]);

  return (
    <section
      id="preview"
      aria-labelledby="preview-heading"
      className="relative mx-auto grid max-w-7xl scroll-mt-24 grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#100e13]/75 px-6 py-12 shadow-2xl backdrop-blur-xl sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16"
    >
      <div className="relative z-10 max-w-xl">
        <div className="mb-4 flex items-center gap-2 font-feature-stat text-xs tracking-[0.2em] text-[#f3b775]">
          <span className="h-px w-7 bg-[#e29d52]" />
          APP SCREENSHOTS
        </div>
        <h2
          id="preview-heading"
          className="font-['Boldini','Bodoni_Moda',serif] text-4xl font-normal tracking-tight text-white sm:text-5xl"
        >
          A little preview
          <span className="block italic text-[#f3b775]">of your next favorite.</span>
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-300 sm:text-base">
          Take a look around PixelMusic. Pick a screen, then open it at full size to
          see how the app feels on your phone.
        </p>

        <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={activeIndex === index}
              className={`group flex items-center gap-3 rounded-xl border p-2 text-left transition-all ${
                activeIndex === index
                  ? 'border-[#e29d52]/70 bg-[#e29d52]/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]'
              }`}
            >
              <img
                src={screenshot.src}
                alt=""
                className="h-14 w-10 rounded-md object-cover object-top"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">
                  {screenshot.title}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-neutral-400">
                  {screenshot.description}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous screenshot"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#e29d52]/60 hover:text-[#f3b775]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-feature-stat text-xs text-neutral-400">
            {String(activeIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next screenshot"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#e29d52]/60 hover:text-[#f3b775]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="ml-1 text-xs text-neutral-500">Tap the phone to expand</span>
        </div>
      </div>

      <div className="relative z-10 flex justify-center">
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label={`Open ${activeScreenshot.title} screenshot fullscreen`}
          className="group relative w-[min(68vw,280px)] overflow-hidden rounded-[2.5rem] border-[7px] border-[#28252d] bg-[#08080a] p-1.5 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.9)] outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#f3b775] focus-visible:ring-offset-4 focus-visible:ring-offset-[#100e13]"
        >
          <span className="pointer-events-none absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#08080a]" />
          <img
            key={activeScreenshot.src}
            src={activeScreenshot.src}
            alt={`${activeScreenshot.title} screen: ${activeScreenshot.description}`}
            className="aspect-[768/1706] w-full rounded-[2rem] object-cover"
          />
          <span className="absolute inset-1.5 flex items-center justify-center rounded-[2rem] bg-black/0 transition-colors group-hover:bg-black/30">
            <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="h-4 w-4" />
              View full size
            </span>
          </span>
        </button>
      </div>

      <MaterialDialog
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        ariaLabel={`${activeScreenshot.title} app screenshot`}
        className="preview-fullscreen-dialog"
      >
        <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-[#08080a] p-3 sm:p-5">
          <div className="mb-3 flex w-full max-w-md items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">{activeScreenshot.title}</h3>
              <p className="text-xs text-neutral-400">
                {activeIndex + 1} of {screenshots.length} · Use arrow keys to browse
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous screenshot"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#e29d52]/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next screenshot"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#e29d52]/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close fullscreen preview"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white hover:border-white/40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <img
            key={activeScreenshot.src}
            src={activeScreenshot.src}
            alt={`${activeScreenshot.title} screen: ${activeScreenshot.description}`}
            className="max-h-[calc(100dvh-130px)] max-w-full rounded-[1.75rem] object-contain"
          />
        </div>
      </MaterialDialog>
    </section>
  );
};
