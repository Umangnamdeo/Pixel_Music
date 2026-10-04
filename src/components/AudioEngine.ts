/**
 * AudioEngine.ts
 * Real-time Web Audio API sound generator & frequency analyzer.
 * Generates rich, relaxing late-night ambient harmonic chord pads,
 * vinyl warmth, and provides real-time FFT frequency data for Three.js 3D visualizers.
 */

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  album: string;
  format: string;
  duration: number; // in seconds
  bpm: number;
  rootFreq: number;
}

export const TRACK_LIST: TrackInfo[] = [
  {
    id: 'track-1',
    title: 'Cassini Division',
    artist: 'PixelMusic Sound Lab',
    album: 'Orbits in Resonance',
    format: 'FLAC 24-bit • 96 kHz',
    duration: 184,
    bpm: 64,
    rootFreq: 110, // A2
  },
  {
    id: 'track-2',
    title: 'Midnight Transit',
    artist: 'Echoes of Enceladus',
    album: 'Solar Winds Vol. IV',
    format: 'FLAC 24-bit • 88.2 kHz',
    duration: 212,
    bpm: 72,
    rootFreq: 130.81, // C3
  },
  {
    id: 'track-3',
    title: 'Aurora Borealis (Late Hours)',
    artist: 'Komorebi Horizon',
    album: 'Deep Sleep & Curious Minds',
    format: 'DSD 5.6 MHz • Bit-Perfect',
    duration: 245,
    bpm: 58,
    rootFreq: 98, // G2
  },
];

class AudioController {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private currentTrackIndex = 0;
  private timerId: number | null = null;
  private elapsedSeconds = 0;
  private activeOscillators: OscillatorNode[] = [];
  private noiseNode: AudioNode | null = null;
  private eqNodes: { [key: string]: BiquadFilterNode } = {};
  private listeners: Set<() => void> = new Set();

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.85;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      // 3-Band Equalizer
      const bass = this.ctx.createBiquadFilter();
      bass.type = 'lowshelf';
      bass.frequency.value = 200;
      bass.gain.value = 2;

      const mid = this.ctx.createBiquadFilter();
      mid.type = 'peaking';
      mid.frequency.value = 1000;
      mid.Q.value = 1;
      mid.gain.value = 0;

      const treble = this.ctx.createBiquadFilter();
      treble.type = 'highshelf';
      treble.frequency.value = 4000;
      treble.gain.value = 1.5;

      this.eqNodes = { bass, mid, treble };

      // Chain: Sources -> Bass -> Mid -> Treble -> Analyser -> MasterGain -> Destination
      bass.connect(mid);
      mid.connect(treble);
      treble.connect(this.analyser);
      this.analyser.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEqGain(band: 'bass' | 'mid' | 'treble', value: number) {
    if (this.eqNodes[band] && this.ctx) {
      this.eqNodes[band].gain.setTargetAtTime(value, this.ctx.currentTime, 0.05);
      this.notify();
    }
  }

  public getEqGain(band: 'bass' | 'mid' | 'treble'): number {
    return this.eqNodes[band]?.gain.value ?? 0;
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.05);
      this.notify();
    }
  }

  public getVolume(): number {
    return this.masterGain?.gain.value ?? 0.7;
  }

  public getCurrentTrack(): TrackInfo {
    return TRACK_LIST[this.currentTrackIndex];
  }

  public getTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getPlaybackState() {
    return {
      isPlaying: this.isPlaying,
      track: this.getCurrentTrack(),
      elapsedSeconds: this.elapsedSeconds,
      volume: this.getVolume(),
    };
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.eqNodes.bass) return;

    this.stopSynthesizer();
    this.startSynthesizer();
    this.isPlaying = true;

    if (!this.timerId) {
      this.timerId = window.setInterval(() => {
        this.elapsedSeconds++;
        if (this.elapsedSeconds >= this.getCurrentTrack().duration) {
          this.next();
        } else {
          this.notify();
        }
      }, 1000);
    }
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynthesizer();
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % TRACK_LIST.length;
    this.elapsedSeconds = 0;
    if (this.isPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  public prev() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    this.elapsedSeconds = 0;
    if (this.isPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  public seek(seconds: number) {
    this.elapsedSeconds = Math.max(0, Math.min(this.getCurrentTrack().duration, seconds));
    this.notify();
  }

  private startSynthesizer() {
    if (!this.ctx || !this.eqNodes.bass) return;
    const now = this.ctx.currentTime;
    const track = this.getCurrentTrack();
    const baseFreq = track.rootFreq;

    // Harmonic frequencies for lush late-night chord (Root, 5th, Maj7/Min7, Octave, 9th)
    const chordOffsets = [1, 1.498, 1.887, 2.0, 2.247];

    chordOffsets.forEach((ratio, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Subtle detune for rich analog chorus
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);
      osc.detune.setValueAtTime((idx - 2) * 5, now);

      // Gentle LFO filter vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(3.5, now);
      lfo.connect(osc.frequency);
      lfo.start(now);

      const targetGain = 0.08 / (idx + 1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(targetGain, now + 1.2);

      osc.connect(gain);
      gain.connect(this.eqNodes.bass);
      osc.start(now);

      this.activeOscillators.push(osc, lfo);
    });

    // Soft vinyl/tape warmth noise
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200, now);
      noiseFilter.Q.setValueAtTime(1.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.008, now);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.eqNodes.bass);

      whiteNoise.start(now);
      this.noiseNode = whiteNoise;
    } catch {
      // Ignore audio buffer error
    }
  }

  private stopSynthesizer() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore
      }
    });
    this.activeOscillators = [];

    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch {
        // Ignore
      }
      this.noiseNode = null;
    }
  }

  /**
   * Returns normalized frequency bins (0 to 1) for Three.js animations.
   */
  public getFrequencyData(array: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(array as unknown as Uint8Array<ArrayBuffer>);
    } else {
      array.fill(0);
    }
  }

  public getAverageFrequency(): number {
    if (!this.analyser || !this.isPlaying) return 0;
    const data = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
    this.analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum / data.length / 255;
  }
}

export const audioEngine = new AudioController();
