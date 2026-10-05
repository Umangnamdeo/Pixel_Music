import React, { useState } from 'react';
import { X, Download, Check, ShieldCheck, Smartphone, ExternalLink } from 'lucide-react';
import { MaterialDialog } from './MaterialDialog';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFile?: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  selectedFile = 'PixelMusic-v1.4.09-universal.apk',
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleStartDownload = () => {
    setDownloadProgress(10);
    setDownloadComplete(false);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 250);

    // Also trigger file download in browser
    const blob = new Blob([
      `PixelMusic Release Package\nVersion: 1.4.09\nFile: ${selectedFile}\nStatus: Verified\nOfficial Repository: https://github.com/ianshulyadav/PixelMusicApp\n`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.replace('.apk', '-info.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MaterialDialog isOpen={isOpen} onClose={onClose} ariaLabel="Download PixelMusic">
      <div
        className="dialog-panel relative w-full max-w-lg rounded-3xl bg-[#0f0e14] border border-[#e29d52]/30 p-6 sm:p-8 space-y-6 text-neutral-200 font-feature-body"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5">
          <img
            src="/logo.png"
            alt="PixelMusic Logo"
            className="w-12 h-12 rounded-2xl shadow-xl border border-white/10 shrink-0"
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#f3b775]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFIED GITHUB ARTIFACT</span>
            </div>
            <h3 className="font-['Newsreader',serif] text-2xl font-semibold text-white tracking-tight">
              Download <span className="text-[#f3b775]">PixelMusic</span>
            </h3>
            <p className="text-xs text-neutral-400 font-feature-stat">
              Version 1.4.09 • Standalone Android APK
            </p>
          </div>
        </div>

        {/* Selected Package Details */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-neutral-400">Package</span>
            <span className="font-mono text-white font-medium">{selectedFile}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-neutral-400">Compatibility</span>
            <span className="font-mono text-neutral-200">Android 8.0+ (ARM / x86)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-neutral-400">License</span>
            <span className="font-mono text-neutral-200">GNU GPL v3.0 (Open Source)</span>
          </div>
        </div>

        {/* Progress bar if downloading */}
        {downloadProgress !== null && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <span>{downloadComplete ? 'Download Ready' : 'Downloading Artifact...'}</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e29d52] to-[#f3b775] transition-all duration-200"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleStartDownload}
            className="w-full py-3 px-5 rounded-xl bg-[#e29d52] hover:bg-[#f3b775] text-neutral-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#e29d52]/25 active:scale-[0.99] transition-all cursor-pointer"
          >
            {downloadComplete ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Downloaded Successfully</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{downloadProgress !== null ? 'Download Again' : 'Confirm & Download APK'}</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/ianshulyadav/PixelMusicApp/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors border border-white/10"
          >
            <span>Or download directly on GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Quick Android Installation Guide */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 space-y-1.5">
          <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#e29d52]" />
            <span>Installation Note for Android</span>
          </div>
          <p className="leading-relaxed">
            When prompted by your browser or file manager, tap <strong className="text-white">Settings</strong> and toggle on{' '}
            <strong className="text-white">&ldquo;Allow from this source&rdquo;</strong> to install the standalone release.
          </p>
        </div>
      </div>
    </MaterialDialog>
  );
};
