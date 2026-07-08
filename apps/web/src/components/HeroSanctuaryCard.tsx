'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface HeroSanctuaryCardProps {
  onReserve?: () => void;
}

export default function HeroSanctuaryCard({ onReserve }: HeroSanctuaryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none perspective-1000">
      {/* Volumetric Gold Backlight */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#E28743]/25 via-[#DCA86A]/20 to-[#6D2E46]/25 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

      {/* 3D Parallax Glass Card - Perfectly proportioned for 100vh single screen */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 20,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="luxury-card relative overflow-hidden border border-[#DCA86A]/45 shadow-[0_20px_60px_rgba(0,0,0,0.85)] group cursor-pointer"
      >
        {/* Specular Light Sheen */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ transform: 'translateZ(30px)' }}
        />

        {/* Top Telemetry Header */}
        <div
          className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#08060A]/90 backdrop-blur-md relative z-10"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DCA86A] animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#DCA86A]">
              LIVE SANCTUARY TELEMETRY
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#FAF6F0]/70 border border-white/15 px-2 py-0.5 bg-white/5">
            LOT 04 // ETHIOPIA
          </span>
        </div>

        {/* Hero Image Showcase inside Card */}
        <div className="relative h-40 sm:h-44 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85"
            alt="Afterhours Espresso Alchemy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A11] via-[#0D0A11]/30 to-transparent" />

          {/* Floating Terroir Badge overlay */}
          <div
            className="absolute bottom-3 left-5 right-5 flex items-end justify-between"
            style={{ transform: 'translateZ(35px)' }}
          >
            <div>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#DCA86A] font-mono block mb-0.5">
                CURRENT EXTRACTION
              </span>
              <h4 className="font-serif text-xl text-[#FAF6F0] drop-shadow-md">
                Midnight Bloom No. 04
              </h4>
            </div>
            <span className="font-serif text-base text-[#DCA86A]">₹ 1,450</span>
          </div>
        </div>

        {/* Live Acoustic & Thermal Metas */}
        <div
          className="px-5 py-3.5 grid grid-cols-3 gap-3 border-b border-white/10 bg-[#0E0B12]/95 text-[11px] relative z-10"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div>
            <span className="text-[#FAF6F0]/45 block text-[8px] uppercase tracking-wider font-mono mb-0.5">
              THERMAL PRECISION
            </span>
            <span className="font-serif text-base text-[#DCA86A] font-semibold">91.4°C</span>
          </div>
          <div>
            <span className="text-[#FAF6F0]/45 block text-[8px] uppercase tracking-wider font-mono mb-0.5">
              AMBIENT SOUND
            </span>
            <span className="font-mono text-[11px] text-[#FAF6F0]">42 dB Quiet</span>
          </div>
          <div>
            <span className="text-[#FAF6F0]/45 block text-[8px] uppercase tracking-wider font-mono mb-0.5">
              ELEVATION
            </span>
            <span className="font-mono text-[11px] text-[#FAF6F0]">2,150m MASL</span>
          </div>
        </div>

        {/* Tasting Notes & VIP Reserve CTA */}
        <div
          className="px-5 py-3.5 bg-[#0A080E] flex items-center justify-between gap-3 relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="min-w-0">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#B5987A] block font-mono mb-0.5">
              TASTING PROFILE
            </span>
            <p className="text-[11px] text-[#FAF6F0]/85 font-mono truncate">
              Night Jasmine • Clarified Peach • Still Silence
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onReserve?.();
            }}
            className="btn-luxury px-4 py-2.5 text-[9px] uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5 transition-all shrink-0"
          >
            Reserve Table <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
