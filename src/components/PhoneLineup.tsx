import { useEffect, useState } from 'react';

const phones = [
  {
    brand: 'Google',
    model: 'Pixel 9 Pro XL',
    frame: 'rounded-[2.5rem] border-[#77716a] bg-gradient-to-br from-[#77716a] via-[#29272a] to-[#aaa39b] p-[5px]',
    display: 'rounded-[2.1rem]',
    detail: (
      <span className="absolute left-1/2 top-2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#101014] ring-2 ring-black/80" />
    ),
  },
  {
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra',
    frame: 'rounded-[1.8rem] border-[#777b80] bg-gradient-to-br from-[#aeb3b8] via-[#27292c] to-[#73777c] p-[5px]',
    display: 'rounded-[1.45rem]',
    detail: (
      <span className="absolute left-1/2 top-2 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-[#08090b] ring-2 ring-black/80" />
    ),
  },
];

const screenshots = [
  { title: 'Home', src: '/screenshots/home.png' },
  { title: 'Now Playing', src: '/screenshots/now-playing.png' },
  { title: 'Library', src: '/screenshots/library.png' },
  { title: 'Explore', src: '/screenshots/explore.png' },
];

export const PhoneLineup = () => {
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const phone = phones[selectedPhoneIndex];
  const screenshot = screenshots[screenshotIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setScreenshotIndex((index) => (index + 1) % screenshots.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="phones"
      aria-labelledby="phones-heading"
      className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20"
    >
      <div className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 font-feature-stat text-xs tracking-[0.2em] text-[#f3b775]">
          <span className="h-px w-7 bg-[#e29d52]" />
          MADE FOR YOUR PHONE
          <span className="h-px w-7 bg-[#e29d52]" />
        </div>
        <h2
          id="phones-heading"
          className="font-['Boldini','Bodoni_Moda',serif] text-4xl font-normal tracking-tight text-white sm:text-5xl"
        >
          Your music, in good company.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
          Choose a flagship to see Pixel Music on its screen.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 rounded-3xl border border-white/10 bg-[#100e13]/75 p-6 shadow-xl backdrop-blur-xl sm:grid-cols-2 sm:gap-12 sm:p-10">
        <div className="flex justify-center">
          <div className="relative w-[min(58vw,220px)]">
            <span aria-hidden="true" className="phone-ambient-glow absolute -inset-5 rounded-full bg-[#e29d52]/20 blur-2xl" />
            <div
              className={`relative overflow-hidden border shadow-[0_24px_55px_-20px_rgba(0,0,0,0.95)] ${phone.frame}`}
            >
              {phone.detail}
              <img
                key={screenshot.src}
                src={screenshot.src}
                alt={`${screenshot.title} screen shown on the ${phone.brand} ${phone.model}`}
                className={`phone-screen-transition aspect-[768/1706] w-full object-cover ${phone.display}`}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="font-feature-stat text-xs uppercase tracking-[0.18em] text-[#f3b775]">
            SELECT YOUR DEVICE
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            {phone.brand} {phone.model}
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            Previewing {screenshot.title} · changes every 2 seconds
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {phones.map((option, index) => (
              <button
                key={option.brand}
                type="button"
                onClick={() => setSelectedPhoneIndex(index)}
                aria-pressed={selectedPhoneIndex === index}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b775] ${
                  selectedPhoneIndex === index
                    ? 'border-[#e29d52]/70 bg-[#e29d52]/10 text-[#f3b775]'
                    : 'border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/25 hover:bg-white/[0.07]'
                }`}
              >
                <span className="block">{option.brand}</span>
                <span className="mt-1 block text-xs text-neutral-400">{option.model}</span>
              </button>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-neutral-500">
            Illustrative device frames. Phone models are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </section>
  );
};
