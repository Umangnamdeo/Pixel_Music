import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BarChart3,
  ChevronRight,
  Cloud,
  Disc3,
  Heart,
  Home,
  Library,
  ListMusic,
  MoreVertical,
  Music2,
  Pause,
  Play,
  Search,
  Settings,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  X,
} from 'lucide-react';

type PreviewScreen = 'home' | 'explore' | 'library' | 'search' | 'stats' | 'player' | 'queue';
type StatsPeriod = 'Month to date' | 'Year to date' | 'All time';
type CloudService = 'Spotify' | 'YouTube';
type PreviewTheme = 'default' | 'sage' | 'sunset' | 'purple-pink' | 'ocean' | 'sunny' | 'dark';

interface AppExperiencePreviewProps {
  onOpenDownload: () => void;
}

const tracks = [
  { title: 'Desi Kalakaar', artist: 'Yo Yo Honey Singh', plays: 42, time: '3h 18m', artwork: '/images/desi-kalakaar-poster.png' },
  { title: 'Raho Bachke', artist: 'Jass Manak, Jaani', plays: 31, time: '2h 43m', artwork: '/images/song-artwork/raho-bachke.png' },
  { title: 'Arijit Singh 1 AM Mix', artist: 'Arijit Singh', plays: 24, time: '1h 56m', artwork: '/images/song-artwork/arijit-1am-mix.png' },
  { title: 'Chand Mera Dil', artist: 'Sachin-Jigar, Amitabh Bhattacharya', plays: 18, time: '1h 21m', artwork: '/images/song-artwork/chand-mera-dil.png' },
  { title: 'Sajke', artist: 'Panther', plays: 16, time: '1h 12m', artwork: '/images/song-artwork/sajke.png' },
  { title: 'Fallin Apart', artist: 'Karan Aujla, Ikky', plays: 14, time: '58m', artwork: '/images/song-artwork/fallin-apart.png' },
];

const exploreCategories = ['All', 'Local', 'Podcasts', 'Romance', 'Focus', 'New'];
const previewThemes: { id: PreviewTheme; name: string; description: string; colors: string[] }[] = [
  { id: 'default', name: 'Default (Dynamic)', description: 'System wallpaper colors', colors: ['#9b8200', '#726848', '#46705d', '#e8e2d2'] },
  { id: 'sage', name: 'Sage Green', description: 'Soft mint and sage tones', colors: ['#28785c', '#a6ead0', '#81cbd0', '#141714'] },
  { id: 'sunset', name: 'Sunset Orange', description: 'Warm amber and peach tones', colors: ['#a95624', '#ffd5bc', '#dfba79', '#171514'] },
  { id: 'purple-pink', name: 'Purple Pink', description: 'Soft orchid and blush pink', colors: ['#804587', '#efb5ca', '#f6d9fa', '#17121a'] },
  { id: 'ocean', name: 'Ocean Blue', description: 'Calm ocean and sky tones', colors: ['#236e9c', '#a9d7f3', '#b8a4dc', '#10161c'] },
  { id: 'sunny', name: 'Sunny Yellow', description: 'Warm honey and gold tones', colors: ['#8a6b00', '#f5db6b', '#a4d49f', '#19170d'] },
  { id: 'dark', name: 'Dark & Grey', description: 'Monochrome and gray tones', colors: ['#17181a', '#bfc1c8', '#d9d9de', '#101113'] },
];

export const AppExperiencePreview = ({
  onOpenDownload,
}: AppExperiencePreviewProps) => {
  const [screen, setScreen] = useState<PreviewScreen>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showCloud, setShowCloud] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState<StatsPeriod>('All time');
  const [cloudService, setCloudService] = useState<CloudService>('Spotify');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackTitle, setSelectedTrackTitle] = useState(tracks[0].title);
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('purple-pink');
  const selectedTrack = tracks.find((track) => track.title === selectedTrackTitle) ?? tracks[0];
  const searchResults = useMemo(
    () => tracks.filter(({ title, artist }) => `${title} ${artist}`.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery],
  );

  const goToScreen = (nextScreen: PreviewScreen) => {
    setScreen(nextScreen);
    setShowSettings(false);
    setShowCloud(false);
  };

  const playTrack = (track: (typeof tracks)[number]) => {
    setSelectedTrackTitle(track.title);
    setIsPlaying(true);
    goToScreen('player');
  };

  const renderTrackRow = (track: (typeof tracks)[number]) => (
    <button
      key={track.title}
      type="button"
      onClick={() => playTrack(track)}
      className="app-preview-track-row"
    >
      <img src={track.artwork} alt={`${track.title} cover artwork`} className="app-preview-track-art" />
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-semibold text-white">{track.title}</span>
        <span className="mt-0.5 block truncate text-xs text-neutral-400">{track.artist}</span>
      </span>
      <MoreVertical className="h-4 w-4 shrink-0 text-amber-100/65" />
    </button>
  );

  const renderHome = () => (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="app-preview-eyebrow">YOUR NIGHT, IN ROTATION</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">Quick Picks</h3>
        </div>
        <button type="button" onClick={() => goToScreen('explore')} className="app-preview-round-action" aria-label="Explore music">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <button type="button" onClick={() => playTrack(tracks[0])} className="app-preview-featured-card">
        <img src={tracks[0].artwork} alt={`${tracks[0].title} cover artwork`} className="app-preview-featured-art" />
        <span className="app-preview-featured-shade" />
        <span className="absolute bottom-0 left-0 right-0 z-10 p-4 text-left">
          <span className="block truncate text-lg font-bold text-white">{tracks[0].title}</span>
          <span className="block truncate text-xs text-white/75">{tracks[0].artist}</span>
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white">
          <MoreVertical className="h-4 w-4" />
        </span>
      </button>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="app-preview-display-title">Your<br />Mix</p>
          <p className="mt-2 text-xs text-neutral-400">A little more of what you love</p>
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          className="app-preview-shuffle"
          aria-label={isPlaying ? 'Pause your mix' : 'Shuffle your mix'}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Shuffle className="h-6 w-6" />}
        </button>
      </div>
      <div className="app-preview-mix-art" aria-label="Your Mix album art">
        {tracks.slice(1, 5).map((track) => <img key={track.title} src={track.artwork} alt="" />)}
        <span>YOUR<br />MIX</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-white">Recently played</h4>
          <p className="text-xs text-neutral-500">Back to your orbit</p>
        </div>
        <button type="button" onClick={() => goToScreen('stats')} className="app-preview-text-link">Listening stats</button>
      </div>
      {renderTrackRow(tracks[1])}
    </div>
  );

  const renderExplore = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold text-white">Explore</h3>
        <Sparkles className="h-5 w-5 text-amber-300" />
      </div>
      <div className="app-preview-chip-row">
        {exploreCategories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`app-preview-filter-chip ${selectedCategory === category ? 'is-selected' : ''}`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="app-preview-eyebrow">MADE FOR THIS MOMENT</p>
          <h4 className="mt-1 text-lg font-semibold text-white">Quick Picks</h4>
        </div>
        <ChevronRight className="h-4 w-4 text-amber-200/70" />
      </div>
      <button type="button" onClick={() => playTrack(tracks[2])} className="app-preview-featured-card app-preview-featured-compact">
        <img src={tracks[2].artwork} alt={`${tracks[2].title} cover artwork`} className="app-preview-featured-art" />
        <span className="app-preview-featured-shade" />
        <span className="absolute bottom-0 left-0 right-0 z-10 p-4 text-left">
          <span className="block text-lg font-bold text-white">{selectedCategory === 'All' ? tracks[2].title : `${selectedCategory} Mix`}</span>
          <span className="block text-xs text-white/75">{tracks[2].artist}</span>
        </span>
      </button>
      <div className="app-preview-artist-card">
        <span className="app-preview-artist-avatar"><Music2 className="h-6 w-6" /></span>
        <span className="min-w-0 flex-1">
          <span className="app-preview-eyebrow">ARTIST SPOTLIGHT</span>
          <span className="mt-1 block font-semibold text-white">Arijit Singh</span>
          <span className="block truncate text-xs text-neutral-400">Top track: {tracks[2].title}</span>
        </span>
        <button type="button" onClick={() => playTrack(tracks[2])} className="app-preview-mini-play" aria-label="Play artist radio">
          <Play className="h-4 w-4 fill-current" />
        </button>
      </div>
      <div>
        <h4 className="font-semibold text-white">Albums for you</h4>
        <p className="mb-3 text-xs text-neutral-500">Picked for your listening orbit</p>
        <div className="grid grid-cols-2 gap-3">
          {tracks.slice(3, 5).map((track) => (
            <button type="button" key={track.title} onClick={() => playTrack(track)} className="text-left">
              <img src={track.artwork} alt={`${track.title} cover artwork`} className="app-preview-album-art" />
              <span className="mt-2 block truncate text-xs font-semibold text-white">{track.title}</span>
              <span className="block truncate text-[10px] text-neutral-500">{track.artist}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="app-preview-eyebrow">YOUR COLLECTION</p>
          <h3 className="text-3xl font-semibold text-white">Library</h3>
        </div>
        <button type="button" onClick={() => setShowCloud(true)} className="app-preview-round-action" aria-label="Cloud streaming">
          <Cloud className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-white">Your playlists</h4>
          <p className="text-xs text-neutral-500">Saved for another orbit</p>
        </div>
        <button type="button" onClick={() => goToScreen('stats')} className="app-preview-text-link">Stats <ChevronRight className="inline h-3 w-3" /></button>
      </div>
      {tracks.slice(0, 4).map(renderTrackRow)}
      <div className="app-preview-library-card">
        <Disc3 className="h-5 w-5 text-amber-300" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">Late night rotation</p>
          <p className="text-xs text-neutral-500">12 tracks · Offline ready</p>
        </div>
        <Play className="h-4 w-4 text-amber-200" />
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-4">
      <label className="app-preview-search">
        <Search className="h-4 w-4 shrink-0 text-amber-200/70" />
        <input
          aria-label="Search songs and artists"
          placeholder="Songs, artists, albums"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        {searchQuery && (
          <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
            <X className="h-4 w-4" />
          </button>
        )}
      </label>
      <div className="app-preview-chip-row">
        {['All', 'Songs', 'Albums', 'Artists'].map((filter, index) => (
          <span key={filter} className={`app-preview-filter-chip ${index === 0 ? 'is-selected' : ''}`}>{filter}</span>
        ))}
      </div>
      <p className="app-preview-eyebrow">{searchQuery ? 'MATCHING YOUR SEARCH' : 'RECENTLY PLAYED'}</p>
      <div className="space-y-2">
        {searchResults.length > 0
          ? searchResults.map(renderTrackRow)
          : <p className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4 text-sm text-neutral-400">No matches yet. Try another song or artist.</p>}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => goToScreen('home')} className="app-preview-round-action" aria-label="Back to home">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <p className="app-preview-eyebrow">YOUR PERSONAL REPLAY</p>
          <h3 className="text-xl font-semibold text-white">Listening Stats</h3>
        </div>
      </div>
      <div className="app-preview-chip-row">
        {(['Month to date', 'Year to date', 'All time'] as const).map((period) => (
          <button
            type="button"
            key={period}
            onClick={() => setSelectedPeriod(period)}
            aria-pressed={selectedPeriod === period}
            className={`app-preview-filter-chip ${selectedPeriod === period ? 'is-selected' : ''}`}
          >
            {period === 'Month to date' ? 'Month' : period === 'Year to date' ? 'Year' : 'All time'}
          </button>
        ))}
      </div>
      <div className="app-preview-stat-total">
        <p className="app-preview-eyebrow">{selectedPeriod.toUpperCase()}</p>
        <p className="mt-1 text-3xl font-semibold text-white">128 <span className="text-sm font-normal text-neutral-400">listens</span></p>
        <p className="mt-1 text-xs text-neutral-400">Across 34 tracks · 18h 42m</p>
      </div>
      <div className="app-preview-stats-panel">
        <h4 className="mb-3 font-semibold text-white">Tracks in this range</h4>
        {tracks.slice(0, 3).map((track, index) => (
          <div className="app-preview-stat-row" key={track.title}>
            <span className="app-preview-rank">{index + 1}</span>
            <img src={track.artwork} alt={`${track.title} cover artwork`} className="app-preview-track-art" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-white">{track.title}</span>
              <span className="block text-[10px] text-neutral-500">{track.plays} plays</span>
            </span>
            <span className="text-[10px] text-amber-100/70">{track.time}</span>
            <span className="app-preview-stat-bar"><span style={{ width: `${100 - index * 22}%` }} /></span>
          </div>
        ))}
      </div>
      <div className="app-preview-stats-panel">
        <h4 className="mb-2 font-semibold text-white">Top albums</h4>
        <p className="text-xs leading-relaxed text-neutral-400">Your most-played records, collected in one quiet little corner.</p>
        <div className="mt-3 flex items-center gap-3">
          <img src={tracks[0].artwork} alt={`${tracks[0].title} cover artwork`} className="h-10 w-10 rounded-xl object-cover" />
          <span className="text-sm font-medium text-amber-100">{tracks[0].title}</span>
        </div>
      </div>
    </div>
  );

  const renderPlayer = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => goToScreen('home')} className="app-preview-round-action" aria-label="Collapse player">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-amber-100">Now Playing</span>
        <button type="button" onClick={() => goToScreen('queue')} className="app-preview-round-action" aria-label="Open queue">
          <ListMusic className="h-4 w-4" />
        </button>
      </div>
      <img src={selectedTrack.artwork} alt={`${selectedTrack.title} cover artwork`} className="aspect-square w-full rounded-[1.4rem] border border-amber-100/10 object-cover shadow-[0_12px_40px_rgba(0,0,0,0.4)]" />
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold text-white">{selectedTrack.title}</h4>
          <p className="text-sm text-neutral-400">{selectedTrack.artist}</p>
        </div>
        <button type="button" aria-label="Add to favorites" className="app-preview-round-action"><Heart className="h-4 w-4" /></button>
      </div>
      <div className="app-preview-track-progress"><span /></div>
      <div className="flex justify-between text-[10px] text-neutral-400"><span>00:42</span><span>03:51</span></div>
      <div className="grid grid-cols-3 items-center gap-3">
        <button type="button" className="app-preview-transport" aria-label="Previous track"><SkipBack className="h-5 w-5" /></button>
        <button type="button" onClick={() => setIsPlaying((playing) => !playing)} className="app-preview-main-play" aria-label={isPlaying ? 'Pause preview' : 'Play preview'}>
          {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}
        </button>
        <button type="button" className="app-preview-transport" aria-label="Next track"><SkipForward className="h-5 w-5" /></button>
      </div>
      <div className="grid grid-cols-3 rounded-full border border-amber-100/10 bg-black/25 p-1">
        <button type="button" className="app-preview-transport" aria-label="Shuffle"><Shuffle className="h-4 w-4" /></button>
        <button type="button" className="app-preview-transport" aria-label="Lyrics"><AudioLines className="h-4 w-4" /></button>
        <button type="button" onClick={() => setShowCloud(true)} className="app-preview-transport" aria-label="Queue"><ListMusic className="h-4 w-4" /></button>
      </div>
    </div>
  );

  const renderQueue = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => goToScreen('player')} className="app-preview-round-action" aria-label="Back to player">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <p className="app-preview-eyebrow">UP NEXT</p>
          <h3 className="text-xl font-semibold text-white">Playing queue</h3>
        </div>
      </div>
      <div className="rounded-2xl border border-amber-100/10 bg-amber-500/[0.06] p-3">
        <p className="text-xs text-amber-100/70">NOW PLAYING</p>
        {renderTrackRow(selectedTrack)}
      </div>
      <p className="app-preview-eyebrow">NEXT IN ROTATION</p>
      <div className="space-y-2">{tracks.filter((track) => track.title !== selectedTrack.title).slice(0, 4).map(renderTrackRow)}</div>
      <p className="text-center text-xs text-neutral-500">That’s everything in this preview queue.</p>
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case 'explore': return renderExplore();
      case 'library': return renderLibrary();
      case 'search': return renderSearch();
      case 'stats': return renderStats();
      case 'player': return renderPlayer();
      case 'queue': return renderQueue();
      default: return renderHome();
    }
  };

  return (
    <section id="preview" className="w-full scroll-mt-28 font-feature-body">
      <div className="flex justify-center">
        <div className="mx-auto w-full max-w-[22rem]">
          <div className="app-preview-device" data-theme={previewTheme}>
            <div className="app-preview-status"><span>9:41</span><span>● ● ● &nbsp; 92%</span></div>
            <div className="app-preview-topbar">
              <div className="app-preview-brand">
                <span className="app-preview-brand-mark"><Music2 className="h-4 w-4" /></span>
                PixelMusic
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowCloud(true)} className="app-preview-round-action" aria-label="Cloud streaming"><Cloud className="h-4 w-4" /></button>
                <button type="button" onClick={() => goToScreen('stats')} className="app-preview-round-action" aria-label="Listening stats"><BarChart3 className="h-4 w-4" /></button>
                <button type="button" onClick={() => setShowSettings(true)} className="app-preview-round-action" aria-label="Appearance settings"><Settings className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="app-preview-content" key={screen}>
              {renderScreen()}
            </div>

            {screen !== 'player' && screen !== 'stats' && screen !== 'queue' && (
              <nav aria-label="Preview app navigation" className="app-preview-bottom-nav">
                {([
                  ['home', Home, 'Home'],
                  ['explore', Disc3, 'Explore'],
                  ['library', Library, 'Library'],
                  ['search', Search, 'Search'],
                ] as const).map(([destination, Icon, label]) => (
                  <button
                    type="button"
                    key={destination}
                    onClick={() => goToScreen(destination)}
                    className={`app-preview-nav-item ${screen === destination ? 'is-active' : ''}`}
                    aria-label={label}
                    aria-current={screen === destination ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {screen === destination && <span>{label}</span>}
                  </button>
                ))}
              </nav>
            )}

            {(showSettings || showCloud) && (
              <div className="app-preview-overlay" role="presentation" onClick={() => { setShowSettings(false); setShowCloud(false); }}>
                <section
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={showSettings ? 'app-preview-settings-title' : 'app-preview-cloud-title'}
                  className="app-preview-sheet"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-amber-100/30" />
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="app-preview-eyebrow">{showSettings ? 'MAKE IT YOURS' : 'LISTEN YOUR WAY'}</p>
                      <h3 id={showSettings ? 'app-preview-settings-title' : 'app-preview-cloud-title'} className="mt-1 text-xl font-semibold text-white">
                        {showSettings ? 'Appearance' : 'Cloud streaming'}
                      </h3>
                    </div>
                    <button type="button" onClick={() => { setShowSettings(false); setShowCloud(false); }} className="app-preview-round-action" aria-label="Close panel">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {showSettings ? (
                    <div className="space-y-2">
                      {previewThemes.map((theme) => (
                        <button
                          type="button"
                          key={theme.id}
                          onClick={() => setPreviewTheme(theme.id)}
                          className={`app-preview-theme-row ${previewTheme === theme.id ? 'is-selected' : ''}`}
                          aria-pressed={previewTheme === theme.id}
                        >
                          <span>
                            <span className="block font-semibold text-white">{theme.name}</span>
                            <span className="text-xs text-neutral-400">{theme.description}</span>
                          </span>
                          <span className="app-preview-theme-swatches" aria-hidden="true">
                            {theme.colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-neutral-400">Choose a source to see the quick-import experience. Provider connections are a preview in this website.</p>
                      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-amber-100/10 bg-black/20 p-1.5">
                        {(['Spotify', 'YouTube'] as const).map((service) => (
                          <button type="button" key={service} onClick={() => setCloudService(service)} className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${cloudService === service ? 'bg-amber-500 text-black' : 'text-neutral-300 hover:bg-white/5'}`}>
                            {service}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-2xl border border-amber-100/10 bg-white/[0.03] p-4">
                        <p className="text-sm font-medium text-white">Quick import</p>
                        <p className="mt-1 text-xs text-neutral-400">Paste a public {cloudService} playlist link in the app to begin.</p>
                        <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-neutral-500">
                          <Cloud className="h-4 w-4" />
                          <span className="truncate">https://{cloudService === 'Spotify' ? 'open.spotify.com/playlist/…' : 'youtube.com/playlist?list=…'}</span>
                        </div>
                      </div>
                      <button type="button" onClick={onOpenDownload} className="w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-300">Get the app to import playlists</button>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
          <p className="mt-4 text-center font-feature-stat text-[10px] tracking-[0.15em] text-neutral-500">TAP A TAB OR CONTROL TO EXPLORE</p>
          <p className="mt-2 text-center text-[10px] leading-relaxed text-neutral-500">Sample library and listening data · Cloud import is a UI preview</p>
        </div>
      </div>
    </section>
  );
};
