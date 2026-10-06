export type ThemeKey = 'starlight' | 'deep-orbit' | 'solar-bronze';

export const THEME_PRESETS: { id: ThemeKey; name: string; color: string; glow: string }[] = [
  { id: 'starlight', name: 'Starlight Gold', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.22)' },
  { id: 'deep-orbit', name: 'Deep Orbit', color: '#d97706', glow: 'rgba(217, 119, 6, 0.22)' },
  { id: 'solar-bronze', name: 'Solar Bronze', color: '#bc7a3e', glow: 'rgba(188, 122, 62, 0.22)' },
];
