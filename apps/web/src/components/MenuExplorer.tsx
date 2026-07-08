'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, Droplets, Flame, Compass } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'botanical' | 'pastry';
  origin: string;
  altitude: string;
  process: string;
  roast: string;
  profile: string;
  description: string;
  notes: string[];
  radar: {
    acidity: number;
    sweetness: number;
    body: number;
    finish: number;
  };
  price: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'midnight-bloom',
    name: 'Midnight Bloom No. 04',
    category: 'espresso',
    origin: 'Yirgacheffe, Ethiopia',
    altitude: '2,150m MASL',
    process: 'Anaerobic Honey Fermentation',
    roast: 'Luminous Light Roast',
    profile: 'Night Jasmine • White Peach • Still Silence',
    description:
      'Harvested under the full moon and aged in cedar wine casks. Extracted at precise 91.4°C for an ethereal floral sweetness that illuminates the quietest midnight hours.',
    notes: ['Jasmine Blossom', 'Clarified Peach', 'Bergamot Zest'],
    radar: { acidity: 90, sweetness: 88, body: 68, finish: 95 },
    price: '₹ 1,450',
  },
  {
    id: 'velvet-obsidian',
    name: 'Velvet Obsidian 72',
    category: 'espresso',
    origin: 'Huila, Colombia',
    altitude: '1,980m MASL',
    process: 'Thermal Shock Washed',
    roast: 'Rich Velvet Medium',
    profile: 'Dark Cacao • Smoked Walnut • Volcanic Earth',
    description:
      'Grown on mineral-rich slopes in Huila. Pulls a dense, amber-crema shot layered with notes of 72% Ecuadorian dark chocolate and toasted hazelnut woodsmoke.',
    notes: ['Cacao Nibs', 'Smoked Walnut', 'Amber Treacle'],
    radar: { acidity: 55, sweetness: 78, body: 96, finish: 92 },
    price: '₹ 1,650',
  },
  {
    id: 'solaris-eclipse',
    name: 'Solaris Eclipse Elixir',
    category: 'botanical',
    origin: 'Tarrazú, Costa Rica',
    altitude: '1,850m MASL',
    process: '18-Hour Cold Drip Distillation',
    roast: 'Golden Cognac Roast',
    profile: 'Forest Honey • Blood Orange • Shiso Leaf',
    description:
      'Slow-dripped over crystal ice for 18 hours, then finished with botanical Japanese purple shiso and sparkling elderflower essence for a refreshing late-night aperitif.',
    notes: ['Forest Honey', 'Blood Orange Zest', 'Purple Shiso'],
    radar: { acidity: 82, sweetness: 92, body: 72, finish: 88 },
    price: '₹ 1,850',
  },
  {
    id: 'smoked-vanilla-tart',
    name: 'Smoked Vanilla & Cacao Tart',
    category: 'pastry',
    origin: 'Afterhours Bakery Sanctuary',
    altitude: 'House Crafted Daily',
    process: 'Charred Bourbon Vanilla Pods',
    roast: 'Pâtisserie Artisanale',
    profile: 'Madagascar Vanilla • Dark Truffle • Sea Salt',
    description:
      'A razor-thin dark cacao shell filled with smoked Madagascar vanilla bean custard and finished with Maldon smoked sea salt.',
    notes: ['Smoked Vanilla Bean', 'Dark Chocolate Ganache', 'Maldon Salt'],
    radar: { acidity: 25, sweetness: 88, body: 94, finish: 85 },
    price: '₹ 1,250',
  },
];

export default function MenuExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'espresso' | 'botanical' | 'pastry'>('all');
  const [activeItem, setActiveItem] = useState<MenuItem>(MENU_ITEMS[0]);

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8 mb-12">
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'all', label: 'All Sanctuary Offerings' },
            { id: 'espresso', label: 'Rare Espresso Extractions' },
            { id: 'botanical', label: 'Cold-Drip & Botanical Elixirs' },
            { id: 'pastry', label: 'Midnight Confections' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.25em] transition-all duration-300 rounded-none ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-[#DCA86A] to-[#E28743] text-[#08060A] font-semibold shadow-[0_0_30px_rgba(226,135,67,0.35)]'
                  : 'border border-white/10 text-[#FAF6F0]/60 hover:text-[#FAF6F0] hover:border-white/30 bg-white/[0.015]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#B5987A] font-mono">
          <Sparkles className="w-3 h-3 text-[#DCA86A]" /> LIMITED DAILY EXTRACTIONS
        </div>
      </div>

      {/* Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selector Cards */}
        <div className="lg:col-span-5 space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`group cursor-pointer p-6 transition-all duration-500 relative overflow-hidden ${
                activeItem.id === item.id
                  ? 'luxury-card border-[#DCA86A] shadow-[0_15px_40px_rgba(226,135,67,0.15)]'
                  : 'border border-white/10 hover:border-white/25 bg-[#100C14]/50'
              }`}
            >
              {activeItem.id === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#DCA86A] to-[#E28743]" />
              )}
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5987A] font-mono">
                  0{index + 1} // {item.origin.split(',')[0]}
                </span>
                <span className="text-xs font-mono text-[#DCA86A] font-semibold">{item.price}</span>
              </div>
              <h4 className="font-serif text-2xl text-[#FAF6F0] group-hover:text-[#DCA86A] transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-[#FAF6F0]/60 italic mt-1.5">{item.profile}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Luxury Sensory Profile Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card p-8 md:p-12 relative overflow-hidden"
            >
              {/* Decorative Ambient Lighting Backdrop */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#E28743]/15 via-[#DCA86A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Header Info */}
              <div className="flex flex-wrap justify-between items-start gap-4 pb-8 border-b border-white/10 relative z-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] block mb-2 flex items-center gap-2 font-mono">
                    <Award className="w-3.5 h-3.5" /> CURATED EXTRACTION PROFILE
                  </span>
                  <h3 className="font-serif text-3xl md:text-5xl text-[#FAF6F0]">
                    {activeItem.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5987A] block font-mono">
                    INVESTMENT
                  </span>
                  <span className="font-serif text-2xl text-[#DCA86A]">{activeItem.price}</span>
                </div>
              </div>

              {/* Terroir & Process Metas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-white/10 text-xs relative z-10">
                <div>
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Origin
                  </span>
                  <span className="text-[#FAF6F0] font-serif text-base">{activeItem.origin}</span>
                </div>
                <div>
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Altitude
                  </span>
                  <span className="text-[#FAF6F0] font-mono">{activeItem.altitude}</span>
                </div>
                <div>
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Process
                  </span>
                  <span className="text-[#FAF6F0]">{activeItem.process}</span>
                </div>
                <div>
                  <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Roast Profile
                  </span>
                  <span className="text-[#DCA86A] font-semibold">{activeItem.roast}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#FAF6F0]/80 font-light leading-relaxed text-base md:text-lg py-8 border-b border-white/10 relative z-10">
                "{activeItem.description}"
              </p>

              {/* Flavor Radar & Sensory Bars */}
              <div className="pt-8 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B5987A] block mb-6 font-mono">
                  SENSORY BALANCE & RADAR PROFILE
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Acidity / Brightness', val: activeItem.radar.acidity },
                    { label: 'Sweetness / Floral', val: activeItem.radar.sweetness },
                    { label: 'Crema Body / Viscosity', val: activeItem.radar.body },
                    { label: 'Clean Finish / Persistence', val: activeItem.radar.finish },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#FAF6F0]/75">{stat.label}</span>
                        <span className="text-[#DCA86A] font-semibold">{stat.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-gradient-to-r from-[#B5987A] via-[#DCA86A] to-[#E28743]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tasting Note Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {activeItem.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 border border-[#DCA86A]/35 bg-[#DCA86A]/10 text-xs text-[#DCA86A] tracking-wider uppercase font-mono"
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
