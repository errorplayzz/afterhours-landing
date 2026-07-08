'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Copy, ArrowRight } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEATING_AREAS = [
  {
    id: 'walnut-bar',
    name: 'The Walnut Bar',
    desc: 'Intimate front-row seats to the barista alchemy & extraction ritual.',
    capacity: '1–2 Guests',
    tag: 'MOST REQUESTED',
  },
  {
    id: 'shadow-booth',
    name: 'Shadow Booths',
    desc: 'Deep obsidian alcoves designed for quiet private conversations.',
    capacity: '2–4 Guests',
    tag: 'SANCTUARY',
  },
  {
    id: 'obsidian-terrace',
    name: 'Obsidian Terrace',
    desc: 'Overlooking silent New Delhi diplomatic skyline with heated stone seating.',
    capacity: '2–6 Guests',
    tag: 'OPEN AIR',
  },
];

const TIME_SLOTS = ['21:30', '22:30', '23:30', '00:30', '01:30'];

const RITUALS = [
  {
    id: 'omakase',
    title: 'Midnight Espresso Omakase',
    desc: '3-course rare single-origin flight paired with smoked cacao pastries.',
  },
  {
    id: 'botanical',
    title: 'Cold-Drip Botanical Elixirs',
    desc: '18-hour slow ice extraction infused with organic mountain herbs.',
  },
  {
    id: 'a-la-carte',
    title: 'A La Carte Sanctuary',
    desc: 'Curate your own late-night selection upon arrival.',
  },
];

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState<'select' | 'details' | 'confirmed'>('select');
  const [selectedArea, setSelectedArea] = useState(SEATING_AREAS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [selectedRitual, setSelectedRitual] = useState(RITUALS[0]);
  const [guestCount, setGuestCount] = useState(2);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const bookingCode = `AH-DELHI-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[10000] overflow-y-auto bg-[#060408]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
          {/* Global Close Button on Overlay */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-[#100C14]/80 border border-[#DCA86A]/40 text-[#FAF6F0] hover:text-[#DCA86A] hover:bg-[#18121E] transition-all shadow-lg"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            className="relative z-10 w-full max-w-3xl my-auto luxury-card border border-[#DCA86A]/40 p-6 md:p-10 shadow-[0_25px_90px_rgba(220,168,106,0.22)]"
          >
            {/* Clean Non-Sticky Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] mb-1.5 flex items-center gap-2 font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> Midnight Concierge
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-[#FAF6F0]">
                  {step === 'select' && 'Select Your Sanctuary'}
                  {step === 'details' && 'Guest & Ritual Details'}
                  {step === 'confirmed' && 'Reservation Confirmed'}
                </h3>
              </div>
            </div>

            {/* Step 1: Sanctuary Area & Time Selection */}
            {step === 'select' && (
              <div className="space-y-7">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#B5987A] block mb-3 font-mono">
                    01 — CHOOSE SEATING EXPERIENCE
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {SEATING_AREAS.map((area) => (
                      <div
                        key={area.id}
                        onClick={() => setSelectedArea(area)}
                        className={`cursor-pointer p-4.5 border transition-all duration-300 ${
                          selectedArea.id === area.id
                            ? 'border-[#DCA86A] bg-[#DCA86A]/12 shadow-[0_0_25px_rgba(220,168,106,0.15)]'
                            : 'border-white/10 hover:border-white/25 bg-white/[0.02]'
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#DCA86A] font-mono block mb-1.5">
                          {area.tag}
                        </span>
                        <h4 className="font-serif text-lg text-[#FAF6F0] mb-1.5">{area.name}</h4>
                        <p className="text-xs text-[#FAF6F0]/65 leading-relaxed mb-3">{area.desc}</p>
                        <span className="text-[10px] text-[#B5987A] font-mono">{area.capacity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#B5987A] block mb-3 font-mono">
                    02 — MIDNIGHT ARRIVAL TIME
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`px-6 py-2.5 text-xs font-mono tracking-wider border transition-all duration-300 ${
                          selectedTime === slot
                            ? 'border-[#DCA86A] bg-gradient-to-r from-[#DCA86A] to-[#E28743] text-[#08060A] font-semibold shadow-[0_0_20px_rgba(220,168,106,0.3)]'
                            : 'border-white/10 text-[#FAF6F0]/80 hover:border-white/30 bg-white/[0.02]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#B5987A] block mb-3 font-mono">
                    03 — TASTING RITUAL
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {RITUALS.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRitual(r)}
                        className={`cursor-pointer p-4 border transition-all duration-300 ${
                          selectedRitual.id === r.id
                            ? 'border-[#DCA86A] bg-[#DCA86A]/12 shadow-[0_0_20px_rgba(220,168,106,0.15)]'
                            : 'border-white/10 hover:border-white/25 bg-white/[0.02]'
                        }`}
                      >
                        <h5 className="font-serif text-base text-[#FAF6F0] mb-1">{r.title}</h5>
                        <p className="text-xs text-[#FAF6F0]/60 leading-relaxed">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 pb-2 flex justify-end">
                  <button
                    onClick={() => setStep('details')}
                    className="btn-luxury group flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.3em] font-semibold transition-all"
                  >
                    Proceed to Guest Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Guest Details */}
            {step === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#B5987A] block mb-2 font-mono">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Min-jun Kang"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#08060A] border border-white/15 px-4 py-3.5 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#DCA86A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#B5987A] block mb-2 font-mono">
                      Number of Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-[#08060A] border border-white/15 px-4 py-3.5 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#DCA86A] transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-6 border border-white/10 bg-white/[0.02] space-y-3">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-[#DCA86A] font-semibold font-mono">
                    Summary of Selection
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#FAF6F0]/40 block font-mono">Sanctuary</span>
                      <span className="text-[#FAF6F0] font-serif text-base">{selectedArea.name}</span>
                    </div>
                    <div>
                      <span className="text-[#FAF6F0]/40 block font-mono">Time Slot</span>
                      <span className="text-[#FAF6F0] font-mono text-base">{selectedTime} IST</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#FAF6F0]/40 block font-mono">Curated Ritual</span>
                      <span className="text-[#FAF6F0] text-sm">{selectedRitual.title}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 pb-2 flex justify-between items-center">
                  <button
                    onClick={() => setStep('select')}
                    className="text-xs uppercase tracking-[0.2em] text-[#FAF6F0]/60 hover:text-[#FAF6F0] font-mono"
                  >
                    ← Back to Areas
                  </button>
                  <button
                    onClick={() => setStep('confirmed')}
                    className="btn-luxury group flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.3em] font-semibold transition-all"
                  >
                    Confirm Midnight Invitation
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Bespoke Digital Pass Confirmation */}
            {step === 'confirmed' && (
              <div className="text-center py-6 space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#DCA86A]/15 border border-[#DCA86A]">
                  <Check className="w-8 h-8 text-[#DCA86A]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#DCA86A] mb-2 font-mono">
                    RESERVATION GUARANTEED
                  </p>
                  <h3 className="font-serif text-3xl md:text-5xl text-[#FAF6F0] mb-3">
                    Your Sanctuary Awaits.
                  </h3>
                  <p className="text-sm text-[#FAF6F0]/65 max-w-md mx-auto leading-relaxed">
                    Present your invitation pass at the brass entrance in New Delhi.
                  </p>
                </div>

                {/* Golden Digital Pass */}
                <div className="max-w-md mx-auto p-6 border border-[#DCA86A]/40 bg-gradient-to-br from-[#18121A] to-[#08060A] text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#DCA86A]/15 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#B5987A] font-mono">
                        NEW DELHI SANCTUARY
                      </span>
                      <h4 className="font-serif text-2xl text-[#FAF6F0]">AFTERHOURS.</h4>
                    </div>
                    <span className="px-3 py-1 bg-[#DCA86A]/20 border border-[#DCA86A]/50 text-[#DCA86A] text-[10px] font-mono">
                      VIP PASS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div>
                      <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                        Guest Name
                      </span>
                      <span className="text-[#FAF6F0] font-serif text-base">
                        {name || 'Distinguished Guest'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                        Time &amp; Party
                      </span>
                      <span className="text-[#FAF6F0] font-mono">
                        {selectedTime} • {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#FAF6F0]/40 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                        Seating
                      </span>
                      <span className="text-[#FAF6F0] text-sm">{selectedArea.name}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#B5987A] block font-mono">
                        INVITATION CODE
                      </span>
                      <span className="font-mono text-base text-[#DCA86A] font-semibold tracking-wider">
                        {bookingCode}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-2 px-4 py-2 border border-[#DCA86A]/40 hover:bg-[#DCA86A]/10 transition-colors text-xs text-[#FAF6F0] font-mono"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3.5 border border-white/20 text-xs uppercase tracking-[0.3em] hover:border-[#DCA86A] hover:text-[#DCA86A] transition-all font-mono"
                >
                  Return to Sanctuary
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
