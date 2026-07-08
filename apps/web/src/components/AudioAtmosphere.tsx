'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AudioAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isInitializedRef = useRef(false);

  const startSanctuaryAudio = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (!isInitializedRef.current) {
        isInitializedRef.current = true;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.22, ctx.currentTime);
        gainNodeRef.current = masterGain;

        // 1. Warm Vinyl Crackle & Atmospheric Hiss Layer
        const bufferSize = ctx.sampleRate * 4;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // Subtle crackles mixed with smooth pink vinyl hiss
          const crackle = Math.random() < 0.0004 ? (Math.random() * 2 - 1) * 0.4 : 0;
          const hiss = (Math.random() * 2 - 1) * 0.025;
          output[i] = hiss + crackle;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(650, ctx.currentTime);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(masterGain);
        whiteNoise.start();

        // 2. Nocturnal Sanctuary Ambient Chord (C Minor 9th Lounge Pad: C3, G3, Bb3, Eb4, D5)
        const frequencies = [130.81, 196.00, 233.08, 311.13, 587.33];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle breathing LFO modulation for organic live lounge feeling
          oscGain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.04, ctx.currentTime);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
        });

        masterGain.connect(ctx.destination);
      } else if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0.22, ctx.currentTime);
      }

      setIsPlaying(true);
    } catch (err) {
      console.error('Audio start error:', err);
    }
  };

  const pauseSanctuaryAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleSoundscape = () => {
    if (!isPlaying) {
      startSanctuaryAudio();
    } else {
      pauseSanctuaryAudio();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5">
      <button
        onClick={toggleSoundscape}
        className={`group flex items-center gap-3 px-4.5 py-2.5 border transition-all duration-500 backdrop-blur-xl shadow-2xl cursor-pointer ${
          isPlaying
            ? 'border-[#DCA86A] bg-[#100C14]/95 text-[#DCA86A] shadow-[0_0_35px_rgba(220,168,106,0.35)] scale-105'
            : 'border-white/20 bg-[#08060A]/90 text-[#FAF6F0]/70 hover:border-[#DCA86A]/60 hover:text-[#FAF6F0]'
        }`}
      >
        {/* Animated 5-Bar Live Spectrum Equalizer */}
        <div className="flex items-end gap-[3px] h-3.5 px-0.5">
          {[0.4, 0.85, 0.6, 1.0, 0.55].map((h, i) => (
            <div
              key={i}
              className={`w-0.5 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-[#DCA86A]' : 'bg-current opacity-40'
              }`}
              style={{
                height: isPlaying ? `${Math.max(4, h * 14)}px` : '3px',
                animation: isPlaying
                  ? `pulse ${0.45 + i * 0.15}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
          ))}
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
          {isPlaying ? 'ATMOSPHERE : ACTIVE' : 'ATMOSPHERE : MUTED'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#DCA86A] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </div>
  );
}
