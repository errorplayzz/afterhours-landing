'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, Award } from 'lucide-react';

const RESERVE_ORIGINS = [
  {
    id: 'ethiopia-04',
    title: 'Midnight Bloom No. 04',
    origin: 'Yirgacheffe, Ethiopia',
    elevation: '2,150m MASL',
    process: 'Anaerobic Honey Fermentation',
    notes: 'Night Jasmine • White Peach • Still Silence',
    description:
      'Cultivated in shaded high-altitude forests and fermented in sealed cedar barrels. Delivers an extraordinarily clean, perfumed floral body layered with white peach sweetness.',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
    tag: 'LOT 01 // ETHIOPIA',
  },
  {
    id: 'colombia-72',
    title: 'Velvet Obsidian 72',
    origin: 'Huila, Colombia',
    elevation: '1,980m MASL',
    process: 'Thermal Shock Washed',
    notes: '72% Dark Cacao • Smoked Walnut • Volcanic Earth',
    description:
      'Grown on mineral-rich volcanic soil in Huila. Extracted at high pressure to produce a velvety, syrupy crema rich in dark chocolate and roasted hazelnut.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    tag: 'LOT 02 // COLOMBIA',
  },
  {
    id: 'sumatra-shadow',
    title: 'Shadow Roast Reserve',
    origin: 'Aceh Gayo, Sumatra',
    elevation: '1,720m MASL',
    process: 'Wet-Hulled Triple Aged',
    notes: 'Cedar Smoke • Leather • Velvet Finish',
    description:
      'A deep, atmospheric dark roast aged in monsoon mountain cellars. Bold, structured, and exceptionally low in acidity.',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
    tag: 'LOT 03 // SUMATRA',
  },
  {
    id: 'costarica-solaris',
    title: 'Solaris Eclipse Elixir',
    origin: 'Tarrazú, Costa Rica',
    elevation: '1,850m MASL',
    process: 'Black Honey Cold Drip',
    notes: 'Wild Forest Honey • Blood Orange • Shiso',
    description:
      'Slow-dripped over crystal ice prisms for 18 hours. Layered with vibrant blood orange brightness and sweet wildflower nectar.',
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
    tag: 'LOT 04 // COSTA RICA',
  },
];

export default function CuratedReserveShowcase({ onReserve }: { onReserve?: () => void }) {
  const [activeLot, setActiveLot] = useState(RESERVE_ORIGINS[0]);

  return (
    <div className="w-full">
      {/* Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {RESERVE_ORIGINS.map((lot) => {
          const isSelected = activeLot.id === lot.id;
          return (
            <button
              key={lot.id}
              onClick={() => setActiveLot(lot)}
              className={`text-left p-6 transition-all duration-500 relative overflow-hidden ${
                isSelected
                  ? 'luxury-card border-[#DCA86A] shadow-[0_15px_40px_rgba(226,135,67,0.22)]'
                  : 'border border-white/10 hover:border-white/25 bg-[#100C14]/40'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DCA86A] to-[#E28743]" />
              )}
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5987A] font-mono block mb-1.5">
                {lot.tag}
              </span>
              <h4 className="font-serif text-xl md:text-2xl text-[#FAF6F0] truncate">
                {lot.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Feature Showcase Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLot.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#DCA86A]/30"
        >
          {/* Left Column: Visual Photography */}
          <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-[600px] overflow-hidden group">
            <img
              src={activeLot.image}
              alt={activeLot.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08060A] via-[#08060A]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#08060A]/30 lg:to-[#100C14]" />

            <div className="absolute top-8 left-8 px-5 py-2.5 bg-[#08060A]/85 backdrop-blur-md border border-[#DCA86A]/40 text-[10px] font-mono tracking-widest text-[#DCA86A] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> SINGLE ORIGIN RESERVE
            </div>
          </div>

          {/* Right Column: Terroir & Sensory Details */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#100C14]/95 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#E28743] font-mono block mb-3">
                {activeLot.tag}
              </span>
              <h3 className="font-serif text-4xl md:text-5xl text-[#FAF6F0] mb-4">
                {activeLot.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#DCA86A] font-mono mb-6">
                ✦ {activeLot.notes}
              </p>

              <p className="text-[#FAF6F0]/80 font-light leading-relaxed text-base md:text-lg mb-8">
                {activeLot.description}
              </p>

              <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/10 text-xs">
                <div>
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1.5 font-mono">
                    TERROIR ORIGIN
                  </span>
                  <span className="text-[#FAF6F0] font-serif text-lg">{activeLot.origin}</span>
                </div>
                <div>
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1.5 font-mono">
                    ELEVATION
                  </span>
                  <span className="text-[#FAF6F0] font-mono text-base">{activeLot.elevation}</span>
                </div>
                <div className="col-span-2 pt-2">
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1.5 font-mono">
                    FERMENTATION &amp; PROCESS
                  </span>
                  <span className="text-[#DCA86A] text-sm font-semibold">{activeLot.process}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B5987A] block font-mono">
                  AVAILABILITY
                </span>
                <span className="text-xs text-[#FAF6F0] font-mono">
                  Limited Daily Extractions
                </span>
              </div>
              <button
                onClick={onReserve}
                className="btn-luxury px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold flex items-center gap-2.5 transition-all"
              >
                Reserve Table <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
