/**
 * SUBWAY RUNNER - DYNAMIC WEB AUDIO MUSIC ENGINE
 * Recreates the iconic energetic urban brass, funky bassline, and drum groove.
 */

class SubwayMusicPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.muted = false;
    this.volume = 0.65;
    this.tempo = 136; // Fast upbeat subway runner tempo
    this.currentStep = 0;
    this.nextNoteTime = 0;
    this.timerId = null;

    // Iconic Brass Hook Melodic Notes (Frequencies in Hz)
    // C4, D4, Eb4, E4, F4, G4, Bb4, C5, Eb5, F5
    this.N = {
      REST: 0,
      C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.00, Bb3: 233.08,
      C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, G4: 392.00,
      Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88, C5: 523.25, D5: 587.33,
      Eb5: 622.25, F5: 698.46, G5: 783.99
    };

    // 32-step brass melody pattern (Subway style energetic hook)
    this.melodyPattern = [
      this.N.C4, this.N.REST, this.N.Eb4, this.N.F4,  this.N.REST, this.N.F4, this.N.Eb4, this.N.F4,
      this.N.G4, this.N.REST, this.N.Bb4, this.N.G4,  this.N.F4, this.N.Eb4, this.N.C4, this.N.REST,
      this.N.C4, this.N.REST, this.N.Eb4, this.N.F4,  this.N.REST, this.N.G4, this.N.Bb4, this.N.C5,
      this.N.Bb4, this.N.G4, this.N.F4, this.N.Eb4,   this.N.F4, this.N.Eb4, this.N.C4, this.N.REST
    ];

    // 32-step Funky Walking Bassline
    this.bassPattern = [
      this.N.C3, this.N.C3, this.N.Eb3, this.N.F3,   this.N.G3, this.N.F3, this.N.Eb3, this.N.D3,
      this.N.C3, this.N.C3, this.N.Bb3, this.N.G3,   this.N.F3, this.N.G3, this.N.Bb3, this.N.B3,
      this.N.C3, this.N.C3, this.N.Eb3, this.N.F3,   this.N.G3, this.N.Bb3, this.N.C4, this.N.Bb3,
      this.N.G3, this.N.F3, this.N.Eb3, this.N.D3,   this.N.C3, this.N.Eb3, this.N.G3, this.N.Bb3
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.scheduleLoop();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  scheduleLoop() {
    if (!this.isPlaying || !this.ctx) return;

    const secondsPer16th = (60.0 / this.tempo) * 0.25;

    while (this.nextNoteTime < this.ctx.currentTime + 0.2) {
      if (!this.muted) {
        this.playBeat(this.currentStep, this.nextNoteTime);
      }
      this.nextNoteTime += secondsPer16th;
      this.currentStep = (this.currentStep + 1) % 32;
    }

    this.timerId = setTimeout(() => this.scheduleLoop(), 40);
  }

  playBeat(step, time) {
    // 1. Kick Drum (Steps 0, 8, 16, 24 + syncopation on 6, 22)
    if (step % 8 === 0 || step === 6 || step === 22) {
      this.playKick(time);
    }

    // 2. Snappy Snare (Steps 4, 12, 20, 28)
    if (step % 8 === 4) {
      this.playSnare(time);
    }

    // 3. Hi-Hats (every step, with accent on offbeats)
    this.playHiHat(time, step % 2 === 1);

    // 4. Funky Bassline
    const bassNote = this.bassPattern[step];
    if (bassNote > 0) {
      this.playBass(bassNote, time, 0.12);
    }

    // 5. Brass Lead Hook
    const leadNote = this.melodyPattern[step];
    if (leadNote > 0) {
      this.playBrass(leadNote, time, 0.16);
    }
  }

  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.08);

    gain.gain.setValueAtTime(0.4 * this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.12);
  }

  playSnare(time) {
    // Noise burst + tone punch
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25 * this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(time);
    noise.stop(time + 0.14);

    // Snare tone
    const osc = this.ctx.createOscillator();
    const tGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.07);
    tGain.gain.setValueAtTime(0.2 * this.volume, time);
    tGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    osc.connect(tGain);
    tGain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.08);
  }

  playHiHat(time, accented) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'highpass' in osc ? 'sine' : 'square';
    osc.frequency.setValueAtTime(accented ? 8500 : 7000, time);

    const vol = (accented ? 0.07 : 0.035) * this.volume;
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.04);
  }

  playBass(freq, time, duration) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(160, time + duration);

    gain.gain.setValueAtTime(0.22 * this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + duration);
  }

  playBrass(freq, time, duration) {
    // Dual detuned sawtooth oscillators for punchy brass horn sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 1.008, time); // Subtle rich chorus detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, time);
    filter.frequency.exponentialRampToValueAtTime(650, time + duration);

    gain.gain.setValueAtTime(0.18 * this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }
}

window.SubwayMusicPlayer = SubwayMusicPlayer;
