'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, MapPin, Clock, Send, Check, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenReservation?: () => void;
}

export default function Footer({ onOpenReservation }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060408] border-t border-white/10 overflow-hidden text-[#FAF6F0] pt-20 pb-12">
      {/* Volumetric Ambient Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-96 ambient-glow-cognac rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* TOP TIER: VIP DISPATCH & RESERVATION BANNER */}
        <div className="luxury-card p-8 md:p-12 mb-20 border border-[#DCA86A]/35 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#DCA86A]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> PRIVATE MEMBERSHIP &amp; DISPATCH
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#FAF6F0]">
                Receive Rare Tasting Invites.
              </h3>
              <p className="text-xs text-[#FAF6F0]/65 leading-relaxed max-w-md font-light">
                Join our private guest registry for monthly single-origin micro-lot releases,
                secret botanical cocktail menus, and priority midnight reservations.
              </p>
            </div>

            {/* Right Form & Actions */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-4">
              <form onSubmit={handleSubscribe} className="w-full sm:flex-1 relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#08060A]/90 border border-white/20 px-5 py-4 text-xs font-mono text-[#FAF6F0] placeholder-[#FAF6F0]/35 focus:outline-none focus:border-[#DCA86A] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-5 bg-[#DCA86A] text-[#08060A] text-[10px] font-mono uppercase tracking-widest font-semibold hover:bg-[#E8BC84] transition-colors flex items-center gap-1.5"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> SENT
                    </>
                  ) : (
                    <>
                      JOIN <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>

              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-8 py-4 border border-[#DCA86A] text-[#DCA86A] text-xs uppercase tracking-[0.25em] font-mono hover:bg-[#DCA86A] hover:text-[#08060A] transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                VIP Reserve <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE TIER: EDITORIAL INFORMATION COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Sanctuary & Coordinates */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#DCA86A] font-mono block">
              01 // SANCTUARY
            </span>
            <p className="font-serif text-2xl text-[#FAF6F0]">New Delhi Sanctuary</p>
            <p className="text-xs text-[#FAF6F0]/65 leading-relaxed">
              New Delhi, India <br />
              Architectural Midnight Espresso Bar
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-[#B5987A]">
                NEW DELHI // INDIA
              </span>
            </div>
          </div>

          {/* Col 2: Hours & Live Status */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#DCA86A] font-mono block">
              02 // RITUAL HOURS
            </span>
            <p className="font-serif text-2xl text-[#FAF6F0]">19:00 — 03:00 IST</p>
            <p className="text-xs text-[#FAF6F0]/65 leading-relaxed">
              Monday through Sunday <br />
              Strictly evening &amp; late-night seating
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DCA86A] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DCA86A]">
                OPEN TONIGHT FOR VIP SEATING
              </span>
            </div>
          </div>

          {/* Col 3: Curated Experience */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#DCA86A] font-mono block">
              03 // SANCTUARY MENU
            </span>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/70 font-light">
              <li className="hover:text-[#DCA86A] transition-colors cursor-pointer flex items-center justify-between">
                <span>Rare Single-Origin Flight</span>
                <span className="font-mono text-[10px] text-[#B5987A]">01</span>
              </li>
              <li className="hover:text-[#DCA86A] transition-colors cursor-pointer flex items-center justify-between">
                <span>18-Hour Botanical Elixirs</span>
                <span className="font-mono text-[10px] text-[#B5987A]">02</span>
              </li>
              <li className="hover:text-[#DCA86A] transition-colors cursor-pointer flex items-center justify-between">
                <span>Midnight Espresso Omakase</span>
                <span className="font-mono text-[10px] text-[#B5987A]">03</span>
              </li>
              <li className="hover:text-[#DCA86A] transition-colors cursor-pointer flex items-center justify-between">
                <span>Smoked Cacao &amp; Vanilla Pastries</span>
                <span className="font-mono text-[10px] text-[#B5987A]">04</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Press & Editorial Recognition */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#DCA86A] font-mono block">
              04 // RECOGNITION
            </span>
            <p className="font-serif text-lg italic text-[#FAF6F0]/85">
              "A rare cinematic haven in New Delhi where specialty coffee meets architectural silence."
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#B5987A] font-mono">
              — MONOCLE EDITORIAL REVIEW, 2026
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#DCA86A] border-b border-[#DCA86A]/40 pb-0.5">
                EXCLUSIVELY CURATED FOR MIDNIGHT RITUALS
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM TIER: GIANT LUMINOUS SIGNATURE TYPOGRAPHY */}
        <div className="py-12 md:py-16 overflow-hidden text-center">
          <h2
            onClick={onOpenReservation}
            className="footer-logo font-serif text-[clamp(3.5rem,13vw,12rem)] leading-none tracking-tight text-[#FAF6F0]/25 hover:text-[#DCA86A] transition-all duration-700 select-none cursor-pointer w-full block font-normal drop-shadow-[0_0_35px_rgba(220,168,106,0.15)]"
          >
            AFTERHOURS<span className="text-[#DCA86A] font-light">.</span>
          </h2>
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#DCA86A]/70 font-mono block mt-2">
            CLICK SIGNATURE TO REQUEST MIDNIGHT TABLE ↗
          </span>
        </div>

        {/* FOOTER FOOTNOTE & TOP RETURN */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-8 text-xs font-mono text-[#FAF6F0]/50 gap-4">
          <p>© 2026 AFTERHOURS ESPRESSO &amp; SANCTUARY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <span className="text-[#B5987A]">NEW DELHI // SANCTUARY // ARCHITECTURE</span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 border border-white/15 hover:border-[#DCA86A] text-[#FAF6F0]/70 hover:text-[#DCA86A] transition-all text-[10px] uppercase tracking-widest"
            >
              TOP <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
