import React from 'react';
import { ArrowDownToLine, Music2, Sparkles } from 'lucide-react';
import { THEME_PRESETS, type ThemeKey } from './theme';

export { THEME_PRESETS } from './theme';
export type { ThemeKey } from './theme';

interface FeaturesSectionProps {
  onOpenDownload: () => void;
  selectedTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

const phoneScreens = [
  { name: 'Home', image: '/screenshots/home.png' },
  { name: 'Explore', image: '/screenshots/explore.png' },
  { name: 'Library', image: '/screenshots/library.png' },
  { name: 'Now playing', image: '/screenshots/now-playing.png' },
  { name: 'Now playing purple', image: '/screenshots/now-playing-purple.jpg' },
  { name: 'Library purple', image: '/screenshots/library-purple.jpg' },
  { name: 'Appearance settings', image: '/screenshots/appearance-purple.jpg' },
  { name: 'Cloud streaming', image: '/screenshots/cloud-streaming-purple.jpg' },
];

const PhoneWagon: React.FC<{ name: string; image: string }> = ({ name, image }) => (
  <div className="music-wagon" role="img" aria-label={`${name} screen riding in its own train wagon`}>
    <div className="music-phone">
      <span className="music-phone-camera" />
      <img src={image} alt="" />
    </div>
    <div className="music-wagon-bed" />
    <span className="music-wheel music-wheel-front" />
    <span className="music-wheel music-wheel-back" />
  </div>
);

const SteamEngine: React.FC = () => (
  <div className="music-engine" role="img" aria-label="Steam locomotive">
    <div className="music-steam" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
    <svg className="music-engine-art" viewBox="0 0 220 160" aria-hidden="true">
      <path className="music-engine-outline" d="M13 116h190v15H13z" />
      <path className="music-engine-outline" d="M36 68h91v48H36z" />
      <path className="music-engine-outline" d="M126 86h50l22 30h-72z" />
      <path className="music-engine-outline" d="M144 48h25v38h-25zM140 43h34v8h-34z" />
      <path className="music-engine-outline" d="M48 48h62v20H48zM56 32h47v16H56z" />
      <path className="music-engine-outline" d="M27 94h9v22h-9zM16 107h20v9H16z" />
      <path className="music-engine-window" d="M66 76h27v22H66z" />
      <path className="music-engine-window" d="M101 76h17v22h-17z" />
      <circle className="music-engine-wheel-large" cx="78" cy="127" r="20" />
      <circle className="music-engine-wheel-large" cx="154" cy="127" r="15" />
      <circle className="music-engine-wheel-small" cx="78" cy="127" r="6" />
      <circle className="music-engine-wheel-small" cx="154" cy="127" r="5" />
      <path className="music-engine-outline" d="M77 127h73M100 113l20 14" />
      <path className="music-engine-light" d="M14 100h14l-7-15z" />
      <path className="music-engine-outline" d="M36 115h-9" />
    </svg>
  </div>
);

const TrainConsist: React.FC<{ duplicate?: boolean }> = ({ duplicate = false }) => (
  <div className="music-train-consist" aria-hidden={duplicate}>
    <SteamEngine />
    {phoneScreens.map((phone) => (
      <PhoneWagon key={phone.name} {...phone} />
    ))}
  </div>
);

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenDownload,
  selectedTheme,
  onThemeChange,
}) => (
  <section
    id="features"
    aria-label="Pixel Music features and animated train"
    className="music-railway-section relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24"
  >
    <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-4">
        <div className="flex select-none items-center gap-2 font-feature-stat text-xs tracking-widest text-[#f3b775]">
          <Sparkles className="h-3.5 w-3.5 text-[#e29d52]" />
          <span>ALL ABOARD THE LISTENING LINE</span>
        </div>
        <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Your music, <span className="font-normal italic text-[#f3b775]">on the move.</span>
        </h2>
        <p className="text-balance text-sm leading-relaxed text-neutral-300 sm:text-base">
          Every screen has its own carriage. Settle in and let Pixel Music take you for a ride.
        </p>
      </div>
      <button
        type="button"
        onClick={onOpenDownload}
        className="music-railway-download inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
      >
        <ArrowDownToLine className="h-4 w-4" />
        Get Pixel Music
      </button>
    </div>

    <div className="music-railway" role="img" aria-label="A steam train carrying Pixel Music screens in individual wagons">
      <div className="music-night-glow" aria-hidden="true" />
      <div className="music-starfield" aria-hidden="true" />
      <div className="music-track" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="music-train-window">
        <div className="music-train-belt">
          <TrainConsist />
          <TrainConsist duplicate />
        </div>
      </div>
      <p className="music-railway-caption">
        <Music2 className="h-3.5 w-3.5" />
        EIGHT SCREENS · ONE SMOOTH RIDE
      </p>
    </div>

    <div className="mt-7 flex flex-wrap items-center gap-2">
      <span className="mr-1 font-feature-stat text-[10px] uppercase tracking-[0.15em] text-neutral-500">
        Choose your color
      </span>
      {THEME_PRESETS.map((theme) => (
        <button
          key={theme.id}
          type="button"
          aria-pressed={selectedTheme === theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`music-theme-button ${selectedTheme === theme.id ? 'is-selected' : ''}`}
        >
          <span style={{ backgroundColor: theme.color }} />
          {theme.name}
        </button>
      ))}
    </div>
  </section>
);
