'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [delhiTime, setDelhiTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setDelhiTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? 'py-4 bg-[#060608]/85 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl md:text-2xl font-serif tracking-[0.2em] text-[#F5F5F1] hover:text-[#D4AF37] transition-colors"
        >
          <span>AFTERHOURS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-10 items-center">
          {['Philosophy', 'Collection', 'Menu', 'Ritual', 'Visit'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.3em] text-[#F5F5F1]/70 hover:text-[#D4AF37] transition-colors font-mono relative py-1 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Corner: Delhi Time & VIP Reservation Trigger */}
        <div className="flex items-center gap-6">
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#A38A63] border-r border-white/10 pr-6">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            <span>NEW DELHI ✦ {delhiTime || '15:48:00'} IST</span>
          </div>

          <button
            onClick={onOpenReservation}
            className="group relative px-6 py-2.5 border border-[#D4AF37]/60 overflow-hidden bg-[#D4AF37]/10 hover:bg-[#D4AF37] transition-all duration-500"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-mono text-[#D4AF37] group-hover:text-[#060608] font-semibold transition-colors flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              VIP Reserve
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
