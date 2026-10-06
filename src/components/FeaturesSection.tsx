import React, { useRef, useState } from 'react';
import {
  AudioLines,
  ChevronDown,
  BatteryCharging,
  Download,
  Heart,
  Headphones,
  ListMusic,
  MoreVertical,
  Moon,
  Pause,
  Play,
  Repeat2,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Shuffle,
  Volume2,
  WifiOff,
} from 'lucide-react';
import type { MdAssistChip } from '@material/web/chips/assist-chip.js';
import type { MdFilterChip } from '@material/web/chips/filter-chip.js';
import type { MdSlider } from '@material/web/slider/slider.js';
import type { MdSwitch } from '@material/web/switch/switch.js';
import type { MdIconButton } from '@material/web/iconbutton/icon-button.js';
import type { MdElevation } from '@material/web/elevation/elevation.js';
import type { MdRipple } from '@material/web/ripple/ripple.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/chips/filter-chip.js';
import '@material/web/slider/slider.js';
import '@material/web/switch/switch.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/elevation/elevation.js';
import '@material/web/ripple/ripple.js';

type MdElementProps<T extends HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'md-assist-chip': MdElementProps<MdAssistChip>;
      'md-filter-chip': MdElementProps<MdFilterChip> & { selected?: boolean };
      'md-slider': MdElementProps<MdSlider> & {
        value?: number;
        min?: number;
        max?: number;
        step?: number;
        labeled?: boolean;
      };
      'md-switch': MdElementProps<MdSwitch> & { selected?: boolean };
      'md-icon-button': MdElementProps<MdIconButton>;
      'md-elevation': MdElementProps<MdElevation>;
      'md-ripple': MdElementProps<MdRipple>;
    }
  }
}

export type ThemeKey = 'starlight' | 'deep-orbit' | 'solar-bronze';

export const THEME_PRESETS: { id: ThemeKey; name: string; color: string; glow: string }[] = [
  { id: 'starlight', name: 'Starlight Gold', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.22)' },
  { id: 'deep-orbit', name: 'Deep Orbit', color: '#d97706', glow: 'rgba(217, 119, 6, 0.22)' },
  { id: 'solar-bronze', name: 'Solar Bronze', color: '#bc7a3e', glow: 'rgba(188, 122, 62, 0.22)' },
];

interface FeaturesSectionProps {
  onOpenDownload: () => void;
  selectedTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

const QUICK_FEATURES = [
  { label: 'No connection required', icon: WifiOff, description: 'Your local library stays ready, even beyond the signal.' },
  { label: 'Safe Listening', icon: ShieldCheck, description: 'Audio guard helps keep listening levels in check.' },
  { label: 'FLAC & DSD Lossless', icon: AudioLines, description: 'Detailed playback for your high-resolution collection.' },
  { label: 'Sleep timer', icon: Moon, description: 'Settle in and let playback wind down with you.' },
  { label: 'Battery Friendly', icon: BatteryCharging, description: 'A lightweight listening companion for long nights.' },
];

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenDownload,
  selectedTheme,
  onThemeChange,
}) => {
  const [playing, setPlaying] = useState(false);
  const [offlineMixEnabled, setOfflineMixEnabled] = useState(true);
  const [audioGuardEnabled, setAudioGuardEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState('');
  const [equalizer, setEqualizer] = useState(62);
  const [selectedFormat, setSelectedFormat] = useState<'FLAC' | 'DSD'>('FLAC');
  const [selectedQuickFeature, setSelectedQuickFeature] = useState(QUICK_FEATURES[0]);
  const selectedPalette = THEME_PRESETS.find((theme) => theme.id === selectedTheme) ?? THEME_PRESETS[0];
  const audioRef = useRef<HTMLAudioElement>(null);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setPlaybackError('');
    try {
      await audio.play();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setPlaying(false);
      setPlaybackError(error instanceof Error ? error.message : 'Unable to play this audio file.');
    }
  };

  const seekToProgress = (value: number | undefined) => {
    const audio = audioRef.current;
    if (!audio || typeof value !== 'number' || !Number.isFinite(value) || !Number.isFinite(audio.duration)) return;
    audio.currentTime = (Math.max(0, Math.min(100, value)) / 100) * audio.duration;
  };

  return (
    <section
      id="features"
      className="cosmic-m3-bento relative z-10 mx-auto max-w-7xl px-6 py-20 font-feature-body sm:px-8 sm:py-24"
    >
      <div className="mb-10 max-w-2xl space-y-4">
        <div className="flex select-none items-center gap-2 font-feature-stat text-xs tracking-widest text-[#f3b775]">
          <Sparkles className="h-3.5 w-3.5 text-[#e29d52]" />
          <span>BUILT FOR THE LISTENING ORBIT</span>
        </div>
        <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Crafted for sound.
          <br />
          <span className="font-normal italic text-[#f3b775]">Engineered for freedom.</span>
        </h2>
        <p className="text-balance text-sm leading-relaxed text-neutral-300 sm:text-base">
          Lossless playback, open-source freedom, and thoughtful tools for every way you listen.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:auto-rows-[minmax(15rem,auto)] lg:grid-cols-12">
        <article className="cosmic-m3-card cosmic-m3-card-left group relative flex min-h-[32rem] flex-col overflow-hidden rounded-[28px] p-5 sm:p-6 md:col-span-1 lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <md-elevation aria-hidden="true" className="cosmic-m3-elevation" />
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-feature-stat text-[10px] uppercase tracking-[0.17em] text-amber-200/60">Pure and clear audio</p>
              <AudioLines className="h-4 w-4 text-amber-300" />
            </div>
            <md-assist-chip className="cosmic-m3-chip mb-4" onClick={() => setSelectedFormat('FLAC')}>
              <Headphones slot="icon" className="h-4 w-4" />
              Bit-perfect output
            </md-assist-chip>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">
              Every note, kept as the artist intended.
            </p>

            <div className="flex flex-col items-start gap-2.5">
              {QUICK_FEATURES.map(({ label, icon: Icon, description }) => (
                <md-assist-chip
                  key={label}
                  className={`cosmic-m3-chip ${selectedQuickFeature.label === label ? 'cosmic-m3-chip-selected' : ''}`}
                  onClick={() => setSelectedQuickFeature({ label, icon: Icon, description })}
                >
                  <Icon slot="icon" className="h-4 w-4" />
                  {label}
                </md-assist-chip>
              ))}
            </div>
            <p className="mt-3 min-h-9 text-xs leading-relaxed text-amber-100/60" aria-live="polite">
              {selectedQuickFeature.description}
            </p>
          </div>

          <div className="relative z-10 mt-auto border-t border-amber-100/10 pt-4">
            <p className="mb-2 font-feature-stat text-[10px] uppercase tracking-wider text-neutral-500">Audio fidelity</p>
            <div className="mb-3 flex gap-2">
              {(['FLAC', 'DSD'] as const).map((format) => (
                <md-filter-chip
                  key={format}
                  className="cosmic-m3-filter-chip"
                  selected={selectedFormat === format}
                  onClick={() => setSelectedFormat(format)}
                >
                  {format} lossless
                </md-filter-chip>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Audio Guard</span>
              <md-switch
                className="cosmic-m3-switch"
                aria-label="Enable Audio Guard"
                selected={audioGuardEnabled}
                onInput={(event) => setAudioGuardEnabled(event.currentTarget.selected)}
              />
            </div>
            <label className="mt-3 block text-xs text-neutral-400">
              <span className="mb-1 block">Equalizer · {equalizer}%</span>
              <md-slider
                className="cosmic-m3-slider"
                aria-label="Equalizer intensity"
                min={0}
                max={100}
                value={equalizer}
                onInput={(event) => setEqualizer(event.currentTarget.value ?? equalizer)}
              />
            </label>
          </div>
        </article>

        <article id="preview" className="cosmic-m3-card cosmic-m3-card-center group relative flex min-h-[40rem] scroll-mt-28 flex-col items-center overflow-hidden rounded-[28px] p-5 sm:p-7 md:col-span-2 lg:col-span-6 lg:col-start-4 lg:row-span-2 lg:row-start-1">
          <md-elevation aria-hidden="true" className="cosmic-m3-elevation cosmic-m3-elevation-raised" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(245,158,11,0.15),transparent_58%)]" />
          <div className="relative z-10 flex w-full items-center justify-between gap-3">
            <md-assist-chip className="cosmic-m3-gradient-chip" onClick={onOpenDownload}>
              <Sparkles slot="icon" className="h-4 w-4" />
              Pure and clear sound
            </md-assist-chip>
            <span className="rounded-full border border-amber-100/10 bg-black/30 px-3 py-1.5 font-feature-stat text-[10px] text-amber-100/65">
              PIXELMUSIC · ANDROID
            </span>
          </div>

          <div className="relative z-10 my-6 flex flex-1 items-center justify-center">
            <div aria-hidden="true" className="absolute h-[27rem] w-[27rem] max-w-[85vw] rounded-full border border-amber-300/10 shadow-[0_0_70px_rgba(245,158,11,0.14)]" />
            <div aria-hidden="true" className="absolute h-[22rem] w-[22rem] max-w-[72vw] rounded-full border border-amber-100/[0.06]" />
            <div
              className="cosmic-m3-phone relative z-10 w-[min(23rem,84vw)] rounded-[2.5rem] border border-amber-100/15 bg-[#0c0b0e]/95 px-5 pb-5 pt-4 shadow-[0_0_50px_rgba(245,158,11,0.25)] transition-transform duration-500 ease-out group-hover:scale-[1.015] sm:px-6"
              style={{ borderColor: `${selectedPalette.color}55`, boxShadow: `0 0 50px ${selectedPalette.glow}` }}
            >
              <audio
                ref={audioRef}
                src="/audio/desi-kalakaar.m4a"
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                onDurationChange={(event) => setDuration(event.currentTarget.duration)}
                onEnded={() => setPlaying(false)}
                onError={() => {
                  setPlaying(false);
                  setPlaybackError('Desi Kalakaar could not be loaded. Please try again.');
                }}
              />
              <div className="mb-5 flex items-center justify-between gap-3 text-amber-100/75">
                <md-icon-button className="cosmic-m3-screen-icon" aria-label="Collapse player" title="Collapse player">
                  <ChevronDown className="h-5 w-5" />
                </md-icon-button>
                <span className="text-sm font-semibold tracking-wide text-amber-100/90">Now Playing</span>
                <div className="flex items-center gap-1">
                  <md-icon-button className="cosmic-m3-screen-icon" aria-label="Audio output" title="Audio output">
                    <Volume2 className="h-5 w-5" />
                  </md-icon-button>
                  <md-icon-button className="cosmic-m3-screen-icon" aria-label="Open queue" title="Open queue">
                    <ListMusic className="h-5 w-5" />
                  </md-icon-button>
                </div>
              </div>
              <img
                src="/images/desi-kalakaar-poster.png"
                alt="Desi Kalakaar film poster"
                className="aspect-square w-full rounded-[1.8rem] border border-amber-100/10 object-cover shadow-[0_14px_45px_rgba(0,0,0,0.32)]"
                loading="eager"
                decoding="async"
              />
              <div className="px-0.5 pt-5">
                <div className="flex min-h-16 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-semibold tracking-tight text-amber-100">Desi Kalakaar</h3>
                    <p className="mt-1 text-base text-amber-100/60">Yo Yo Honey Singh</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <md-icon-button className="cosmic-m3-screen-icon" aria-label="Show lyrics" title="Show lyrics">
                      <AudioLines className="h-5 w-5" />
                    </md-icon-button>
                    <md-icon-button className="cosmic-m3-screen-icon" aria-label="More track options" title="More track options">
                      <MoreVertical className="h-5 w-5" />
                    </md-icon-button>
                  </div>
                </div>
                <md-slider
                  className="cosmic-m3-slider cosmic-m3-progress mt-3"
                  aria-label="Track progress"
                  min={0}
                  max={100}
                  value={progress}
                  onInput={(event) => seekToProgress(event.currentTarget.value)}
                />
                <div className="-mt-1 flex justify-between font-feature-stat text-[9px] text-neutral-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="mt-2 flex justify-center">
                  <span className="rounded-full border border-amber-100/10 bg-amber-300/[0.08] px-3 py-1 font-feature-stat text-[10px] tracking-wide text-amber-100/70">
                    M4A · LOCAL AUDIO
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <md-icon-button className="cosmic-m3-transport-button" aria-label="Previous track" title="Previous track">
                    <SkipBack className="h-6 w-6" />
                  </md-icon-button>
                  <button
                    type="button"
                    className="cosmic-m3-play-button"
                    aria-label={playing ? 'Pause Desi Kalakaar' : 'Play Desi Kalakaar'}
                    onClick={() => void togglePlayback()}
                  >
                    <md-ripple className="cosmic-m3-ripple" />
                    {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                  </button>
                  <md-icon-button className="cosmic-m3-transport-button" aria-label="Next track" title="Next track">
                    <SkipForward className="h-6 w-6" />
                  </md-icon-button>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-1 rounded-full border border-amber-200/10 bg-amber-200/[0.04] p-1.5">
                  <md-icon-button className="cosmic-m3-mode-button" aria-label="Shuffle" title="Shuffle">
                    <Shuffle className="h-5 w-5" />
                  </md-icon-button>
                  <md-icon-button className="cosmic-m3-mode-button" aria-label="Repeat" title="Repeat">
                    <Repeat2 className="h-5 w-5" />
                  </md-icon-button>
                  <md-icon-button className="cosmic-m3-mode-button" aria-label="Add to favorites" title="Add to favorites">
                    <Heart className="h-5 w-5" />
                  </md-icon-button>
                </div>
                {playbackError && (
                  <p role="alert" className="mt-3 text-center text-xs text-amber-200/80">
                    {playbackError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-amber-400/20 bg-amber-500/[0.08] px-3 py-1.5 text-[11px] text-amber-100/75">Bit-perfect</span>
            <span className="rounded-full border border-amber-400/20 bg-amber-500/[0.08] px-3 py-1.5 text-[11px] text-amber-100/75">10-band EQ</span>
            <span className="rounded-full border border-amber-400/20 bg-amber-500/[0.08] px-3 py-1.5 text-[11px] text-amber-100/75">Zero telemetry</span>
          </div>
        </article>

        <article className="cosmic-m3-card relative flex min-h-[16rem] flex-col overflow-hidden rounded-[28px] p-5 sm:p-6 md:col-span-1 lg:col-span-3 lg:col-start-10 lg:row-start-1">
          <md-elevation aria-hidden="true" className="cosmic-m3-elevation" />
          <div aria-hidden="true" className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <p className="font-feature-stat text-[10px] uppercase tracking-[0.16em] text-amber-100/60">Dynamic palette</p>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <h3 className="relative z-10 mt-4 text-lg font-semibold text-white">Choose your orbit.</h3>
          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
            {THEME_PRESETS.map((theme) => (
              <md-filter-chip
                key={theme.id}
                className="cosmic-m3-filter-chip"
                selected={selectedTheme === theme.id}
                onClick={() => onThemeChange(theme.id)}
              >
                <span slot="icon" className="cosmic-m3-swatch" style={{ backgroundColor: theme.color, boxShadow: `0 0 12px ${theme.glow}` }} />
                {theme.name}
              </md-filter-chip>
            ))}
          </div>
          <div className="relative z-10 mt-auto flex items-center gap-2 pt-5">
            {THEME_PRESETS.map((theme) => (
              <span
                key={theme.id}
                aria-label={`${theme.name} color swatch`}
                className="h-7 flex-1 rounded-full border border-white/10"
                style={{ background: `linear-gradient(135deg, ${theme.color}, #141218 85%)` }}
              />
            ))}
          </div>
        </article>

        <article className="cosmic-m3-card relative flex min-h-[15rem] flex-col overflow-hidden rounded-[28px] p-5 sm:p-6 md:col-span-1 lg:col-span-3 lg:col-start-10 lg:row-start-2">
          <md-elevation aria-hidden="true" className="cosmic-m3-elevation" />
          <div className="relative z-10 flex items-center justify-between">
            <md-assist-chip className="cosmic-m3-chip">
              <AudioLines slot="icon" className="h-4 w-4" />
              Synchronized lyrics
            </md-assist-chip>
            <span className="font-feature-stat text-[10px] text-amber-200/50">LRC · LIVE</span>
          </div>
          <div className="relative z-10 my-auto space-y-2 py-4 text-center text-xs">
            <p className="text-neutral-500">the night keeps turning</p>
            <p className="font-medium text-amber-100">and the stars keep time</p>
            <p className="text-neutral-500">one more song, one more orbit</p>
          </div>
          <div className="relative z-10 flex items-center justify-between border-t border-amber-100/10 pt-3">
            <div>
              <p className="text-sm font-medium text-white">Smart Offline Mix</p>
              <p className="mt-0.5 text-[11px] text-neutral-500">Keep your next set close</p>
            </div>
            <md-switch
              className="cosmic-m3-switch"
              aria-label="Enable Smart Offline Mix"
              selected={offlineMixEnabled}
              onInput={(event) => setOfflineMixEnabled(event.currentTarget.selected)}
            />
          </div>
        </article>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="font-feature-stat text-[10px] uppercase tracking-[0.15em] text-neutral-500">Made for your night</span>
        <md-assist-chip className="cosmic-m3-chip cosmic-m3-compact-chip">
          <Moon slot="icon" className="h-3.5 w-3.5" />
          Sleep timer
        </md-assist-chip>
        <md-assist-chip className="cosmic-m3-chip cosmic-m3-compact-chip">
          <BatteryCharging slot="icon" className="h-3.5 w-3.5" />
          Battery friendly
        </md-assist-chip>
        <md-assist-chip className="cosmic-m3-chip cosmic-m3-compact-chip">
          <Headphones slot="icon" className="h-3.5 w-3.5" />
          Safe listening
        </md-assist-chip>
        <md-assist-chip className="cosmic-m3-chip cosmic-m3-compact-chip" onClick={onOpenDownload}>
          <Download slot="icon" className="h-3.5 w-3.5" />
          Get the APK
        </md-assist-chip>
      </div>
    </section>
  );
};
