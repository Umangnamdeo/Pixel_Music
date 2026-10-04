import React, { useState } from 'react';
import { Download, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface ReleaseBuild {
  arch: string;
  name: string;
  size: string;
  fileName: string;
  sha256: string;
  recommended?: boolean;
}

const RELEASE_BUILDS: ReleaseBuild[] = [
  {
    arch: 'Universal (All Devices)',
    name: 'PixelMusic Universal APK',
    size: '18.4 MB',
    fileName: 'PixelMusic-v1.4.09-universal.apk',
    sha256: '9f83a218d6bc9431e7845bf029e81b672a912e75e921d3f9bc489c72e41fa802',
    recommended: true,
  },
  {
    arch: 'arm64-v8a',
    name: 'PixelMusic 64-bit ARM',
    size: '14.2 MB',
    fileName: 'PixelMusic-v1.4.09-arm64-v8a.apk',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    arch: 'x86_64',
    name: 'PixelMusic PC & Emulator Build',
    size: '16.1 MB',
    fileName: 'PixelMusic-v1.4.09-x86_64.apk',
    sha256: 'd41d8cd98f00b204e9800998ecf8427e0a811d9a2468d60efd4fb9f82631a0e8',
  },
];

interface ReleasesSectionProps {
  onDownloadClick: (fileName: string) => void;
}

export const ReleasesSection: React.FC<ReleasesSectionProps> = ({ onDownloadClick }) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section id="releases" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto relative z-10 font-feature-body">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-xl">
          <div className="text-xs font-feature-stat text-[#f3b775] tracking-widest uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e29d52]" />
            <span>✦ STABLE DISTRIBUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-feature-body font-bold text-white tracking-tight">
            Latest Release: <span className="italic font-normal text-[#f3b775]">v1.4.09</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-feature-body leading-relaxed">
            Published on GitHub with verifiable automated CI/CD reproducible builds.
            Compatible with Android 8.0 (Oreo) through Android 15.
          </p>
        </div>

        <a
          href="https://github.com/ianshulyadav/PixelMusicApp/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-feature-stat text-[#f3b775] hover:text-white transition-colors underline-offset-4 hover:underline self-start md:self-auto"
        >
          <span>View GitHub Changelog</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Release Builds Grid with Subtle Lift & Cosmic Glow on Hover */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {RELEASE_BUILDS.map((build) => (
          <TiltCard
            key={build.fileName}
            tiltMax={8}
            className={`group relative p-7 bg-[#131119]/85 backdrop-blur-xl rounded-2xl flex flex-col justify-between border cursor-pointer overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2.5 ${
              build.recommended
                ? 'border-[#e29d52]/50 shadow-[0_8px_30px_-6px_rgba(226,157,82,0.18)] hover:border-[#f3b775] hover:shadow-[0_20px_45px_-8px_rgba(226,157,82,0.38),0_0_30px_2px_rgba(243,183,117,0.18)]'
                : 'border-white/10 hover:border-[#e29d52]/60 hover:shadow-[0_20px_40px_-8px_rgba(226,157,82,0.25),0_0_24px_1px_rgba(243,183,117,0.12)]'
            }`}
          >
            {/* Ambient Cosmic Stardust Aura Glow in Card Corner on Hover */}
            <div
              className={`absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                build.recommended ? 'bg-[#e29d52]/25' : 'bg-[#e29d52]/15'
              }`}
            />

            {/* Bottom Inner Edge Subtle Gold Gradient Light */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f3b775]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-feature-stat text-neutral-400">{build.arch}</span>
                {build.recommended && (
                  <span className="text-[10px] font-feature-stat font-semibold px-2 py-0.5 rounded bg-[#e29d52] text-black shadow-sm group-hover:bg-[#f3b775] transition-colors">
                    RECOMMENDED
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-base font-semibold font-feature-body text-white tracking-tight group-hover:text-[#f3b775] transition-colors">
                  {build.name}
                </h4>
                <div className="text-xs text-neutral-400 font-feature-stat mt-1">
                  Size: <span className="text-neutral-200 font-semibold">{build.size}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 group-hover:border-white/10 space-y-1 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-feature-stat text-neutral-400">
                  <span>SHA-256 Checksum</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyHash(build.sha256);
                    }}
                    className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    title="Copy SHA-256"
                  >
                    {copiedHash === build.sha256 ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-feature-stat text-[9px] text-neutral-500 truncate select-all group-hover:text-neutral-400 transition-colors">
                  {build.sha256}
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadClick(build.fileName);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold font-feature-body flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  build.recommended
                    ? 'bg-[#e29d52] hover:bg-[#f3b775] text-black shadow-lg shadow-[#e29d52]/20 group-hover:shadow-[#e29d52]/35 group-hover:scale-[1.02] active:scale-95'
                    : 'bg-white/10 hover:bg-white/15 text-white group-hover:bg-[#e29d52]/20 group-hover:text-white group-hover:border group-hover:border-[#e29d52]/40 active:scale-95'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {build.fileName.split('-').pop()?.replace('.apk', '') || 'APK'}</span>
              </button>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
