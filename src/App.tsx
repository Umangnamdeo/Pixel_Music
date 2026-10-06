import React, { useCallback, useState } from 'react';
import { Navbar } from './components/Navbar';
import { CosmicScene3D, VisualizerMode } from './components/CosmicScene3D';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ReleasesSection } from './components/ReleasesSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { TelegramModal } from './components/TelegramModal';
import { useParallax } from './hooks/useParallax';
import type { ThemeKey } from './components/FeaturesSection';

export default function App() {
  const [selectedHarmony, setSelectedHarmony] = useState<ThemeKey>('starlight');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedApkFile, setSelectedApkFile] = useState('PixelMusic-v1.4.09-universal.apk');
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);
  const [cosmicMode, setCosmicMode] = useState<VisualizerMode>('saturn');
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const { bgOffset, midOffset } = useParallax();

  const handleOpenDownload = (fileName?: string) => {
    if (fileName) {
      setSelectedApkFile(fileName);
    }
    setDownloadModalOpen(true);
  };

  const handleAsteroidImpact = useCallback(() => {
    setShakeTrigger((prev) => prev + 1);
  }, []);

  return (
    <div id="top" className={`site-theme theme-${selectedHarmony} min-h-screen bg-[#070709] text-[#e6e3df] relative selection:bg-[#e29d52]/30 selection:text-[#f3b775] overflow-x-hidden`}>
      {/* 3D WebGL Cosmic Background with Parallax Displacement */}
      <div
        className="fixed inset-0 pointer-events-none parallax-layer z-0"
        style={{
          transform: `translate3d(0, ${bgOffset * -0.2}px, 0)`,
        }}
      >
        <CosmicScene3D
          mode={cosmicMode}
          onModeChange={(mode) => setCosmicMode(mode)}
          onImpact={handleAsteroidImpact}
          interactive={true}
        />
      </div>

      {/* Floating Parallax Depth Particles & Coordinate Markers */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none"
        style={{
          transform: `translate3d(0, ${midOffset * -0.4}px, 0)`,
        }}
      >
        {/* Subtle celestial coordinate markers */}
        <div className="absolute top-[25%] left-10 font-mono text-[9px] text-[#e29d52]/20 tracking-widest hidden xl:block">
          RA 14h 29m 42s • DEC -62° 40′ 46″
        </div>
        <div className="absolute top-[65%] right-12 font-mono text-[9px] text-[#e29d52]/20 tracking-widest hidden xl:block">
          RESONANCE FREQUENCY: 432.08 Hz • DSD128
        </div>
      </div>

      {/* Subtle Atmospheric Gradient Scrim */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#070709]/20 to-[#070709] pointer-events-none z-[3]" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenDownload={() => handleOpenDownload()}
        />

        <main className="flex-1 space-y-12">
          {/* Hero Section */}
          <HeroSection
            onOpenDownload={() => handleOpenDownload()}
            shakeTrigger={shakeTrigger}
          />

          {/* The Good Stuff - 3D Feature Cards */}
          <FeaturesSection
            onOpenDownload={() => handleOpenDownload()}
            selectedTheme={selectedHarmony}
            onThemeChange={setSelectedHarmony}
          />

          {/* Distribution & Releases */}
          <ReleasesSection onDownloadClick={(file) => handleOpenDownload(file)} />
        </main>

        {/* Footer */}
        <Footer
          onOpenDownload={() => handleOpenDownload()}
          onOpenTelegram={() => setTelegramModalOpen(true)}
          selectedTheme={selectedHarmony}
          onThemeChange={setSelectedHarmony}
        />
      </div>

      {/* Modals & Dialogs */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        selectedFile={selectedApkFile}
      />

      <TelegramModal
        isOpen={telegramModalOpen}
        onClose={() => setTelegramModalOpen(false)}
      />
    </div>
  );
}
