'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import { MoveRight } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from('.hero-title .inline-block', {
        y: '100%',
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5,
      });

      gsap.from('.hero-image', {
        scale: 1.2,
        duration: 2.5,
        ease: 'power2.out',
      });

      // Scroll progress bar
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

      // Reveal titles (masked slide-up)
      const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
      sections.forEach((section) => {
        const titleSpans = section.querySelectorAll('.reveal-title .inline-block');
        if (titleSpans.length > 0) {
          gsap.from(titleSpans, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: '100%',
            duration: 1.4,
            stagger: 0.15,
            ease: 'power4.out',
          });
        }

        // Generic reveal elements (staggered fade/slide-up)
        const revealElements = section.querySelectorAll('.reveal-el:not(.reveal-title)');
        if (revealElements.length > 0) {
          gsap.from(revealElements, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
          });
        }
      });

      // Parallax for images
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Responsive animations via matchMedia
      const mm = gsap.matchMedia();

      // Desktop only animations
      mm.add('(min-width: 768px)', () => {
        // Horizontal scroll for signature collection
        const track = document.querySelector('.collection-track') as HTMLElement;
        const section = document.querySelector('.collection-section') as HTMLElement;
        if (track && section) {
          const scrollWidth = track.scrollWidth;
          const containerWidth = section.clientWidth;
          
          gsap.to(track, {
            x: () => -(scrollWidth - containerWidth + 64),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1.2,
              start: 'top top',
              end: () => `+=${scrollWidth}`,
              invalidateOnRefresh: true,
            },
          });
        }

        // Asymmetrical parallax scroll for Environment section
        gsap.to('.asym-left', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: '#visit',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('.asym-right', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '#visit',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Signature reveal for the big footer text
      gsap.from('.footer-logo', {
        scrollTrigger: {
          trigger: '.footer-logo',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <main ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[9999]">
          <div className="scroll-progress-bar h-full w-0 bg-[#967E5B] origin-left" />
        </div>

        <div className="noise" />
        <Navbar />

        {/* 01 Arrival (Hero) */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <HeroScene />
          <div className="absolute inset-0 z-0">
            <img
              src="https://raw.createusercontent.com/2aa0a1af-97d0-4ea2-bdc2-afa7cc5fc5eb/"
              alt="Afterhours Espresso Hero"
              className="hero-image w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-6 z-10 text-center">
            <h1 className="hero-title font-serif text-[clamp(3rem,10vw,8rem)] leading-none text-[#F5F5F1] tracking-tighter">
              <span className="block overflow-hidden">
                <span className="inline-block">After the city</span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block italic font-light">falls silent.</span>
              </span>
            </h1>
            <div className="mt-12 flex justify-center items-center space-x-6 reveal-el">
              <div className="h-[1px] w-12 bg-[#967E5B]" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#967E5B]">
                EST. 2026 — SEOUL
              </p>
              <div className="h-[1px] w-12 bg-[#967E5B]" />
            </div>
          </div>

          <div className="absolute bottom-12 left-12 reveal-el hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#F5F5F1]/40 leading-relaxed max-w-[200px]">
              A cinematic sanctuary for the quietest hours.
            </p>
          </div>
        </section>

        {/* 02 Philosophy */}
        <section id="philosophy" className="reveal-section py-32 md:py-60 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
              <div className="md:col-span-6 reveal-el">
                <h2 className="reveal-title font-serif text-5xl md:text-7xl text-[#F5F5F1] mb-12 leading-[1.1]">
                  <span className="block overflow-hidden">
                    <span className="inline-block">The Ritual of</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="inline-block italic font-light">Late Transitions.</span>
                  </span>
                </h2>
                <div className="max-w-md">
                  <p className="text-[#F5F5F1]/60 leading-relaxed font-light text-lg mb-8">
                    Afterhours is more than a destination; it is a response to the city's frantic
                    pace. We believe coffee tastes different when the distractions fade.
                  </p>
                  <p className="text-[#F5F5F1]/60 leading-relaxed font-light text-lg">
                    Our spaces are designed for introspection, craftsmanship, and the slow
                    appreciation of the perfect extraction.
                  </p>
                </div>
              </div>
              <div className="md:col-span-6 reveal-el">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://raw.createusercontent.com/688e4987-94a8-43b2-8636-30635ae70b96/"
                    alt="Afterhours Philosophy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 Signature Collection */}
        <section id="collection" className="collection-section reveal-section relative bg-[#050505] overflow-hidden">
          <div className="collection-pin-container md:h-screen flex flex-col justify-center relative py-24 md:py-0">
            <div className="container mx-auto px-6 mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row justify-between items-end reveal-el">
                <h2 className="reveal-title font-serif text-4xl md:text-6xl text-[#F5F5F1] leading-none">
                  <span className="block overflow-hidden">
                    <span className="inline-block">The Curated</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="inline-block italic font-light">Collection.</span>
                  </span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#967E5B] mt-6 md:mt-0">
                  Rare Origins • Precise Roasts
                </p>
              </div>
            </div>

            {/* Horizontal sliding track */}
            <div className="collection-track-container w-full overflow-x-auto md:overflow-hidden select-none">
              <div className="collection-track flex gap-8 md:gap-12 px-6 md:px-[10vw] pb-8 md:pb-0 w-max md:w-auto">
                {[
                  {
                    name: 'Midnight Bloom',
                    origin: 'Ethiopia',
                    profile: 'Jasmine, Peach, Silence',
                    img: 'https://raw.createusercontent.com/82d8eee1-2ef0-42c1-9061-1d86027e30a4/',
                  },
                  {
                    name: 'Velvet Obsidian',
                    origin: 'Colombia',
                    profile: 'Dark Cacao, Walnut, Earth',
                    img: 'https://raw.createusercontent.com/82d8eee1-2ef0-42c1-9061-1d86027e30a4/',
                  },
                  {
                    name: 'Shadow Roast',
                    origin: 'Sumatra',
                    profile: 'Smoke, Leather, Stillness',
                    img: 'https://raw.createusercontent.com/82d8eee1-2ef0-42c1-9061-1d86027e30a4/',
                  },
                  {
                    name: 'Solaris Eclipse',
                    origin: 'Costa Rica',
                    profile: 'Honey, Orange Zest, Warmth',
                    img: 'https://raw.createusercontent.com/ed06e1f6-71a8-4cfd-ac9c-b04cf345d9bc/',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="reveal-el group cursor-pointer w-[75vw] md:w-[30vw] flex-shrink-0">
                    <div className="aspect-square overflow-hidden mb-8 bg-[#0A0A0A] relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="parallax-img w-full h-[120%] object-cover absolute top-0 left-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#967E5B] mb-2">
                      {item.origin}
                    </p>
                    <h3 className="font-serif text-2xl text-[#F5F5F1] mb-2">{item.name}</h3>
                    <p className="text-[#F5F5F1]/40 text-sm font-light italic">{item.profile}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 Coffee Ritual (Immersive Storytelling) */}
        <section id="ritual" className="reveal-section py-32 md:py-60 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center reveal-el">
              <h2 className="reveal-title font-serif text-5xl md:text-8xl text-[#F5F5F1] mb-24 leading-none">
                <span className="block overflow-hidden">
                  <span className="inline-block">The Alchemy of</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="inline-block italic font-light text-[#967E5B]">Extraction.</span>
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://raw.createusercontent.com/ed06e1f6-71a8-4cfd-ac9c-b04cf345d9bc/"
                    alt="Coffee Extraction"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-12">
                  {[
                    {
                      step: '01',
                      title: 'The Bean',
                      desc: 'Hand-selected micro-lots from volcanic soil.',
                    },
                    {
                      step: '02',
                      title: 'The Grind',
                      desc: 'Micron-perfect precision for optimal clarity.',
                    },
                    {
                      step: '03',
                      title: 'The Extract',
                      desc: 'Pressure, heat, and time in perfect harmony.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="reveal-el">
                      <span className="text-[10px] font-sans text-[#967E5B] tracking-widest mb-2 block">
                        {item.step}
                      </span>
                      <h4 className="font-serif text-3xl text-[#F5F5F1] mb-4">{item.title}</h4>
                      <p className="text-[#F5F5F1]/50 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Environment - Refined Asymmetrical Layout */}
        <section id="visit" className="reveal-section py-32 md:py-60 bg-[#050505]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="asym-left md:col-span-7 aspect-[4/5] overflow-hidden reveal-el">
                <img
                  src="https://raw.createusercontent.com/688e4987-94a8-43b2-8636-30635ae70b96/"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Environment 1"
                />
              </div>
              <div className="asym-right md:col-span-5 flex flex-col justify-center reveal-el">
                <div className="md:pl-12">
                  <h3 className="reveal-title font-serif text-5xl md:text-7xl text-[#F5F5F1] mb-8 leading-none">
                    <span className="block overflow-hidden">
                      <span className="inline-block">Architectural</span>
                    </span>
                    <span className="block overflow-hidden">
                      <span className="inline-block italic font-light">Stillness.</span>
                    </span>
                  </h3>
                  <p className="text-[#F5F5F1]/60 font-light text-lg leading-relaxed mb-12 max-w-sm">
                    Every material—from the walnut bar to the aged brass fixtures—is chosen for its
                    tactile quality and its ability to age gracefully. We've removed the noise to
                    let the architecture speak.
                  </p>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src="https://raw.createusercontent.com/2aa0a1af-97d0-4ea2-bdc2-afa7cc5fc5eb/"
                      className="w-full h-full object-cover"
                      alt="Environment 2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 Craftsmanship */}
        <section className="reveal-section py-32 md:py-60">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <div className="order-2 md:order-1 reveal-el">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://raw.createusercontent.com/82d8eee1-2ef0-42c1-9061-1d86027e30a4/"
                    className="w-full h-full object-cover"
                    alt="Craftsmanship"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 reveal-el">
                <h2 className="reveal-title font-serif text-5xl md:text-8xl text-[#F5F5F1] mb-12 leading-none">
                  <span className="block overflow-hidden">
                    <span className="inline-block">The Touch of</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="inline-block italic font-light">Metal & Wood.</span>
                  </span>
                </h2>
                <p className="text-[#F5F5F1]/50 font-light text-xl leading-relaxed mb-8">
                  Our baristas are artisans of the evening. Every movement is a practiced ritual,
                  every pour a testament to precision. We celebrate the textures that ground us.
                </p>
                <div className="h-[1px] w-32 bg-[#967E5B]" />
              </div>
            </div>
          </div>
        </section>

        {/* 07 Conversations */}
        <section className="reveal-section py-32 md:py-48 border-y border-white/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto reveal-el">
              <p className="text-2xl md:text-4xl font-serif text-[#F5F5F1] leading-snug mb-12">
                "Afterhours isn't just about the coffee; it's about the silence that accompanies it.
                A rare sanctuary in a city that never stops."
              </p>
              <div className="flex flex-col items-center">
                <div className="w-8 h-[1px] bg-[#967E5B] mb-4" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#967E5B]">
                  Editorial Monthly, 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 08 Reservation */}
        <section id="reserve" className="reveal-section py-32 md:py-60">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-xl mx-auto reveal-el">
              <h2 className="reveal-title font-serif text-5xl md:text-7xl text-[#F5F5F1] mb-8 leading-none">
                <span className="block overflow-hidden">
                  <span className="inline-block">Begin the</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="inline-block italic font-light">Ritual.</span>
                </span>
              </h2>
              <p className="text-[#F5F5F1]/50 font-light mb-12">
                Limited evening reservations available nightly.
              </p>
              <button className="group relative px-12 py-5 border border-[#967E5B] overflow-hidden">
                <div className="absolute inset-0 bg-[#967E5B] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] text-[#F5F5F1] group-hover:text-[#0A0A0A] transition-colors flex items-center justify-center">
                  Reserve a Table <MoveRight className="ml-3 w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 09 Footer */}
        <footer className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
              <div>
                <h2 className="footer-logo font-serif text-6xl md:text-9xl text-[#F5F5F1]/10 mb-8">
                  AFTERHOURS.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#967E5B] mb-6">
                      Location
                    </p>
                    <p className="text-xs text-[#F5F5F1]/60 font-light leading-relaxed">
                      Gangnam-gu, 12-4 <br /> Seoul, South Korea
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#967E5B] mb-6">
                      Hours
                    </p>
                    <p className="text-xs text-[#F5F5F1]/60 font-light leading-relaxed">
                      Mon — Sun <br /> 19:00 — 02:00
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#967E5B] mb-6">
                      Connect
                    </p>
                    <p className="text-xs text-[#F5F5F1]/60 font-light leading-relaxed">
                      Instagram <br /> Editorial
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5F5F1]/30">
                  © 2026 AFTERHOURS ESPRESSO
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
