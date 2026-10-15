/**
 * PROCEDURAL AUDIO ENGINE (Web Audio API)
 * Zero external audio files required, instant 0-latency playback,
 * authentic Minecraft-inspired chiptune music and sound effects.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.currentStep = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.35;
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.7;
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // --- SOUND EFFECTS ---

  playClick() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.04);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playCorrect() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    // Minecraft XP Orb / Level Up Chime (Ascending arpeggio)
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  playWrong() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    // Minecraft Hurt / Hit thud sound
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  playTug() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    // Heavy rope whoosh and strain sound
    const now = this.ctx.currentTime;
    
    // Low whoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.25);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.27);
  }

  playCountdown(pitchHigh = false) {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(pitchHigh ? 880 : 440, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (pitchHigh ? 0.35 : 0.15));

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + (pitchHigh ? 0.36 : 0.16));
  }

  playRaidHorn() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    // Minecraft Pillager / Raid horn sound
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    
    osc1.frequency.setValueAtTime(146.83, now); // D3
    osc2.frequency.setValueAtTime(220.00, now); // A3

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.15);
    gain.gain.setValueAtTime(0.35, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.45);
    osc2.stop(now + 1.45);
  }

  playVictory() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Triumphant Fanfare (C4, E4, G4, C5, E5, G5, C6)
    const melody = [
      { f: 261.63, d: 0.12, t: 0.00 },
      { f: 329.63, d: 0.12, t: 0.12 },
      { f: 392.00, d: 0.12, t: 0.24 },
      { f: 523.25, d: 0.24, t: 0.36 },
      { f: 392.00, d: 0.12, t: 0.60 },
      { f: 523.25, d: 0.60, t: 0.72 }
    ];

    melody.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = now + item.t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, st);

      gain.gain.setValueAtTime(0.4, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + item.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(st);
      osc.stop(st + item.d + 0.05);
    });
  }

  playFirework() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    
    // Whistle
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.36);

    // Boom explosion noise
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);
      filter.frequency.exponentialRampToValueAtTime(100, t + 0.38);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.4, t);
      nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      noise.connect(filter);
      filter.connect(nGain);
      nGain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + 0.4);
    }, 360);
  }

  // --- BACKGROUND MUSIC GENERATOR (Dynamic Chiptune Adventure) ---

  startBgm() {
    this.ensureContext();
    if (!this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.currentStep = 0;
    this.scheduleNextBgmBeat();
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  scheduleNextBgmBeat() {
    if (!this.bgmPlaying || !this.ctx) return;

    // Upbeat Minecraft Adventure Melody (Key of C / Am)
    // 16 beat sequence
    const bpm = 128;
    const stepDuration = 60 / bpm / 2; // eighth notes

    const melodyNotes = [
      523.25, 0, 587.33, 659.25, // C5, -, D5, E5
      783.99, 659.25, 587.33, 523.25, // G5, E5, D5, C5
      659.25, 0, 783.99, 880.00, // E5, -, G5, A5
      1046.50, 880.00, 783.99, 659.25 // C6, A5, G5, E5
    ];

    const bassNotes = [
      130.81, 130.81, 146.83, 164.81, // C3, C3, D3, E3
      174.61, 174.61, 196.00, 196.00, // F3, F3, G3, G3
      220.00, 220.00, 196.00, 196.00, // A3, A3, G3, G3
      174.61, 164.81, 146.83, 130.81  // F3, E3, D3, C3
    ];

    const step = this.currentStep % 16;
    const now = this.ctx.currentTime;

    // Melody lead
    const mFreq = melodyNotes[step];
    if (mFreq > 0 && !this.isMuted) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(mFreq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.85);

      osc.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + stepDuration);
    }

    // Bass line
    const bFreq = bassNotes[step];
    if (bFreq > 0 && !this.isMuted) {
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();

      bOsc.type = 'triangle';
      bOsc.frequency.setValueAtTime(bFreq, now);

      bGain.gain.setValueAtTime(0.12, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9);

      bOsc.connect(bGain);
      bGain.connect(this.bgmGain);

      bOsc.start(now);
      bOsc.stop(now + stepDuration);
    }

    // Light chiptune hi-hat / kick rhythm
    if (!this.isMuted) {
      if (step % 4 === 0) {
        // Soft kick
        const kOsc = this.ctx.createOscillator();
        const kGain = this.ctx.createGain();
        kOsc.frequency.setValueAtTime(120, now);
        kOsc.frequency.exponentialRampToValueAtTime(30, now + 0.08);
        kGain.gain.setValueAtTime(0.2, now);
        kGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        kOsc.connect(kGain);
        kGain.connect(this.bgmGain);
        kOsc.start(now);
        kOsc.stop(now + 0.09);
      } else if (step % 2 === 1) {
        // Chiptune hi-hat tick
        const tickOsc = this.ctx.createOscillator();
        const tickGain = this.ctx.createGain();
        tickOsc.type = 'highpass' in tickOsc ? 'square' : 'sawtooth';
        tickOsc.frequency.setValueAtTime(2400, now);
        tickGain.gain.setValueAtTime(0.03, now);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        tickOsc.connect(tickGain);
        tickGain.connect(this.bgmGain);
        tickOsc.start(now);
        tickOsc.stop(now + 0.035);
      }
    }

    this.currentStep++;
    this.bgmTimer = setTimeout(() => {
      this.scheduleNextBgmBeat();
    }, stepDuration * 1000);
  }
}

// Global Sound Instance
const sound = new SoundEngine();
