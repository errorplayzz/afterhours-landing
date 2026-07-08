'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import HeroScene from '@/components/HeroScene';
import CustomCursor from '@/components/CustomCursor';
import ReservationModal from '@/components/ReservationModal';
import MenuExplorer from '@/components/MenuExplorer';
import CuratedReserveShowcase from '@/components/CuratedReserveShowcase';
import AudioAtmosphere from '@/components/AudioAtmosphere';
import Footer from '@/components/Footer';
import HeroSanctuaryCard from '@/components/HeroSanctuaryCard';
import { Sparkles, Compass, Award, MapPin, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero staggered cinematic title reveal
      gsap.from('.hero-title-line', {
        y: 110,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.hero-meta', {
        y: 35,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.9,
      });

      // Scroll Progress Bar
      gsap.to('.scroll-progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Section Titles & Content Smooth Reveal
      const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
      sections.forEach((section) => {
        const titleElements = section.querySelectorAll('.reveal-title');
        if (titleElements.length > 0) {
          gsap.from(titleElements, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 65,
            opacity: 0,
            duration: 1.3,
            stagger: 0.15,
            ease: 'power4.out',
          });
        }

        const cards = section.querySelectorAll('.reveal-card');
        if (cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            y: 45,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
          });
        }
      });

      // Footer massive signature reveal
      const footerLogo = document.querySelector('.footer-logo');
      if (footerLogo) {
        gsap.from(footerLogo, {
          scrollTrigger: {
            trigger: footerLogo,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 75,
          opacity: 0,
          duration: 1.8,
          ease: 'power4.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <AudioAtmosphere />
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <main ref={containerRef} className="relative min-h-screen bg-[#08060A] overflow-hidden text-[#FAF6F0]">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[9999]">
          <div className="scroll-progress-bar h-full w-0 bg-gradient-to-r from-[#B5987A] via-[#DCA86A] to-[#E28743]" />
        </div>

        <div className="noise" />
        <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

        {/* 01 ARRIVAL — AWWWARDS ASYMMETRIC FLAGSHIP HERO (SINGLE 100VH VIEWPORT FIT) */}
        <section className="relative h-screen max-h-screen flex flex-col justify-between overflow-hidden pt-20 pb-0">
          <HeroScene />

          {/* Volumetric Studio Lighting Backdrops */}
          <div className="absolute top-1/4 left-1/12 w-[450px] h-[450px] ambient-glow-cognac rounded-full blur-3xl pointer-events-none opacity-60" />
          <div className="absolute bottom-1/4 right-1/12 w-[500px] h-[500px] ambient-glow-gold rounded-full blur-3xl pointer-events-none opacity-55" />

          {/* Background Atmospheric Architectural Texture */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85"
              alt="Afterhours Midnight Bar Sanctuary"
              className="w-full h-full object-cover opacity-15 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08060A] via-[#08060A]/70 to-[#08060A]/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08060A] via-transparent to-[#08060A]" />
          </div>

          <div className="container mx-auto px-6 z-10 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Editorial Composition */}
              <div className="lg:col-span-7 text-left space-y-5">
                {/* Floating Studio Editorial Tag */}
                <div className="hero-meta inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#DCA86A]/40 bg-[#100C14]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(220,168,106,0.2)]">
                  <Sparkles className="w-3 h-3 text-[#DCA86A]" />
                  <span className="text-[9px] uppercase tracking-[0.35em] font-mono text-[#DCA86A]">
                    SANCTUARY EXPERIENCE // NEW DELHI
                  </span>
                </div>

                {/* Dramatic Scale Contrast Typography */}
                <h1 className="font-serif text-[clamp(2.8rem,6.8vw,6.2rem)] leading-[0.92] tracking-tight text-[#FAF6F0]">
                  <span className="block overflow-hidden">
                    <span className="hero-title-line block">After the city</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="hero-title-line block italic font-light cognac-gradient-text">
                      falls silent.
                    </span>
                  </span>
                </h1>

                {/* Editorial Subtitle Copy */}
                <p className="hero-meta text-[#FAF6F0]/75 font-light text-sm md:text-base max-w-lg leading-relaxed">
                  An architectural answer to New Delhi&apos;s frantic daylight tempo. Hand-selected
                  volcanic micro-lots extracted with micron-level thermal precision.
                </p>

                {/* Interactive Action Row */}
                <div className="hero-meta flex flex-wrap items-center gap-4 pt-1">
                  <button
                    onClick={() => setIsReservationOpen(true)}
                    className="btn-luxury px-8 py-3.5 text-xs uppercase tracking-[0.3em] font-semibold flex items-center gap-2 transition-all"
                  >
                    Request Midnight Table <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#collection"
                    className="px-7 py-3.5 border border-white/20 text-xs uppercase tracking-[0.3em] text-[#FAF6F0]/85 hover:border-[#DCA86A] hover:text-[#DCA86A] transition-all duration-500 bg-[#100C14]/65 backdrop-blur-md font-mono"
                  >
                    Explore Single Origins
                  </a>
                </div>

                {/* Live Editorial Key Metrics */}
                <div className="hero-meta grid grid-cols-3 gap-4 pt-5 border-t border-white/10 max-w-md">
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#B5987A] block font-mono mb-0.5">
                      ACOUSTICS
                    </span>
                    <span className="font-serif text-base text-[#FAF6F0]">Obsidian Stone</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#B5987A] block font-mono mb-0.5">
                      HOURS
                    </span>
                    <span className="font-mono text-xs text-[#DCA86A]">19:00 — 03:00 IST</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#B5987A] block font-mono mb-0.5">
                      LOCATION
                    </span>
                    <span className="font-serif text-base text-[#FAF6F0]">New Delhi</span>
                  </div>
                </div>
              </div>

              {/* Right Interactive 3D Glass Sanctuary Showcase Card */}
              <div className="lg:col-span-5 relative z-10">
                <HeroSanctuaryCard onReserve={() => setIsReservationOpen(true)} />
              </div>
            </div>
          </div>

          {/* INFINITE GOLD FOIL MARQUEE TICKER STRIP AT BOTTOM EDGE OF VIEWPORT */}
          <div className="w-full border-t border-white/10 bg-[#0C0911]/95 backdrop-blur-md py-2.5 relative z-20 overflow-hidden shrink-0">
            <div className="flex whitespace-nowrap animate-marquee">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-8 text-[10px] uppercase tracking-[0.35em] font-mono text-[#DCA86A]/80 mx-4">
                  <span>✦ SINGLE-ORIGIN ETHIOPIAN MICRO-LOTS</span>
                  <span className="text-white/30">///</span>
                  <span>18-HOUR COLD DRIP BOTANICAL ELIXIRS</span>
                  <span className="text-white/30">///</span>
                  <span>NEW DELHI MIDNIGHT RITUAL</span>
                  <span className="text-white/30">///</span>
                  <span>ACOUSTIC OBSIDIAN SEATING</span>
                  <span className="text-white/30">///</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 PHILOSOPHY — RICH EDITORIAL MAGAZINE LAYOUT */}
        <section id="philosophy" className="reveal-section py-28 md:py-44 relative overflow-hidden border-t border-white/10">
          <div className="absolute -top-32 -left-32 w-96 h-96 ambient-glow-velvet rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-8">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] font-mono block">
                  01 // THE PHILOSOPHY
                </span>
                <h2 className="reveal-title font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.08]">
                  The Ritual of <br />
                  <span className="italic font-light cognac-gradient-text">Late Transitions.</span>
                </h2>
                <div className="space-y-6 text-[#FAF6F0]/75 font-light text-base md:text-lg leading-relaxed max-w-xl">
                  <p>
                    Afterhours is an architectural answer to New Delhi&apos;s frantic daylight tempo. We
                    believe rare coffee reveals deeper clarity and aromatic resonance when ambient
                    distractions fade away.
                  </p>
                  <p>
                    Every micro-lot is hand-selected from high-altitude volcanic terroirs and
                    aged in climate-controlled cedar chambers before precision roasting.
                  </p>
                </div>

                <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/10">
                  <div>
                    <span className="font-serif text-3xl md:text-4xl text-[#DCA86A] block">
                      91.4°C
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#B5987A] font-mono">
                      Extraction Temp
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-3xl md:text-4xl text-[#DCA86A] block">
                      18 HRS
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#B5987A] font-mono">
                      Cold Drip Elixirs
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-3xl md:text-4xl text-[#DCA86A] block">
                      03:00
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#B5987A] font-mono">
                      Nightly Closing
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Twin Visual Frame */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-6 items-center">
                <div className="reveal-card luxury-card overflow-hidden aspect-[4/5] border border-[#DCA86A]/30">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
                    alt="Afterhours Espresso Crema"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="reveal-card luxury-card overflow-hidden aspect-[4/5] border border-[#DCA86A]/30 translate-y-10">
                  <img
                    src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80"
                    alt="Afterhours Architecture"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 THE CURATED RESERVE SHOWCASE (REPLACES EMPTY HORIZONTAL VOID) */}
        <section id="collection" className="reveal-section py-28 md:py-44 relative overflow-hidden bg-[#0A080D] border-t border-white/10">
          <div className="absolute top-1/2 right-0 w-96 h-96 ambient-glow-cognac rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] font-mono block mb-3">
                  02 // SINGLE ORIGIN SHOWCASE
                </span>
                <h2 className="reveal-title font-serif text-4xl md:text-6xl text-[#FAF6F0]">
                  The Curated <span className="italic font-light cognac-gradient-text">Reserve.</span>
                </h2>
              </div>
              <p className="text-xs text-[#FAF6F0]/60 max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
                Single-origin micro-lots roasted in limited batches. Click any lot below to inspect its terroir and tasting notes.
              </p>
            </div>

            <CuratedReserveShowcase onReserve={() => setIsReservationOpen(true)} />
          </div>
        </section>

        {/* 04 INTERACTIVE TASTING ROOM (MenuExplorer) */}
        <section id="menu" className="reveal-section py-28 md:py-44 border-t border-white/10 relative overflow-hidden">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 ambient-glow-gold rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mb-16">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] font-mono block mb-3">
                03 // SENSORY TASTING ROOM
              </span>
              <h2 className="reveal-title font-serif text-4xl md:text-6xl text-[#FAF6F0]">
                Interactive <span className="italic font-light cognac-gradient-text">Menu &amp; Profiles.</span>
              </h2>
              <p className="text-sm text-[#FAF6F0]/65 mt-4 max-w-xl font-light leading-relaxed">
                Explore our rare espresso extractions, 18-hour cold drip botanical elixirs, and house-crafted midnight confections.
              </p>
            </div>

            <MenuExplorer />
          </div>
        </section>

        {/* 05 ARCHITECTURAL STILLNESS & VISIT */}
        <section id="visit" className="reveal-section py-28 md:py-44 bg-[#0A080D] border-t border-white/10 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 aspect-[4/3] overflow-hidden luxury-card border border-[#DCA86A]/30 reveal-card">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                  alt="Afterhours Interior Sanctuary"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="lg:col-span-6 lg:pl-12 space-y-8">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#DCA86A] font-mono block">
                  04 // NEW DELHI SANCTUARY
                </span>
                <h3 className="reveal-title font-serif text-4xl md:text-6xl leading-tight">
                  Designed for <br />
                  <span className="italic font-light cognac-gradient-text">Deep Conversations.</span>
                </h3>
                <p className="text-[#FAF6F0]/75 leading-relaxed font-light text-base">
                  Warm walnut bars, acoustic obsidian stone walls, and bespoke directional amber
                  lighting create a cinematic sanctuary where time slows down.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5987A] block mb-1 font-mono">
                      LOCATION
                    </span>
                    <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                      New Delhi <br /> India
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5987A] block mb-1 font-mono">
                      RESERVATIONS
                    </span>
                    <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                      Walk-ins &amp; VIP <br /> Midnight Tables Available
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="btn-luxury px-8 py-4 text-xs uppercase tracking-[0.3em] font-semibold flex items-center gap-2.5 transition-all"
                >
                  Reserve Sanctuary Seating <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 06 EDITORIAL LUXURY FOOTER */}
        <Footer onOpenReservation={() => setIsReservationOpen(true)} />
      </main>
    </SmoothScroll>
  );
}
