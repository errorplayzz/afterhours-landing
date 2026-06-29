'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-[#0A0A0A]/80 backdrop-blur-md' : 'py-8'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl md:text-2xl font-serif tracking-widest text-[#F5F5F1] hover:text-[#967E5B] transition-colors"
        >
          AFTERHOURS
        </Link>

        <div className="hidden md:flex space-x-12 items-center">
          {['Philosophy', 'Collection', 'Ritual', 'Visit'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#F5F5F1]/60 hover:text-[#967E5B] transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link
            href="#reserve"
            className="px-6 py-2 border border-[#F5F5F1]/20 text-[10px] uppercase tracking-[0.3em] font-sans text-[#F5F5F1] hover:bg-[#F5F5F1] hover:text-[#0A0A0A] transition-all duration-500"
          >
            Reservation
          </Link>
        </div>

        <button className="md:hidden text-[#F5F5F1]">
          <span className="text-[10px] uppercase tracking-[0.2em]">Menu</span>
        </button>
      </div>
    </nav>
  );
}
