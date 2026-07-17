"use client";

import { 
  Building2, 
  Globe, 
  Megaphone, 
  Compass, 
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Workflow,
  Camera,
  Video,
  Code2
} from "lucide-react";

import Header from "@/components/Header";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ReelsMovimiento from "@/components/ReelsMovimiento";
import TetrisBrutalista from "@/components/TetrisBrutalista";
import FormularioPasos from "@/components/FormularioPasos";
import Resultados from "@/components/Resultados";
import Servicios from "@/components/Servicios";
import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Tarea 1: Animación de palabras del hero (Escritura)
    const words = gsap.utils.toArray<HTMLElement>(".hero-word");
    if (words.length > 0) {
      gsap.fromTo(words,
        {
          autoAlpha: 0,
          y: 20,
          willChange: "transform,opacity"
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.05,
          clearProps: "willChange,transform"
        }
      );
    }

    // Tarea 2: Líneas divisoras tipo "corte" al hacer scroll
    const groups = gsap.utils.toArray<HTMLElement>(".section-header-group");
    groups.forEach((group) => {
      const line = group.querySelector(".section-divider");
      const text = group.querySelectorAll("span, h2, div:not(.section-divider), p");
      if (!line) return;

      gsap.set(line, { scaleX: 0 });
      gsap.set(text, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.to(line, {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.inOut",
        willChange: "transform"
      })
      .to(text, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08
      }, "-=0.6");
    });

    // 1. Animación de tarjetas de servicios con ScrollTrigger
    const cards = gsap.utils.toArray<HTMLElement>(".service-card");
    if (cards.length > 0) {
      const mm = gsap.matchMedia();
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop, isTablet } = context.conditions as any;
        const cols = isDesktop ? 3 : (isTablet ? 2 : 1);

        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { 
              autoAlpha: 0, 
              y: 40,
              willChange: "transform,opacity"
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "willChange,transform",
              delay: (index % cols) * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      });
    }

    // 2. Micro-interacciones de botones/CTAs
    const btns = gsap.utils.toArray<HTMLElement>(".hero-btn, .vertical-details-btn");
    
    const listeners = btns.map((btn) => {
      const enter = () => gsap.to(btn, { scale: 1.03, duration: 0.25, ease: "power2.out" });
      const leave = () => gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.inOut" });
      const down = () => gsap.to(btn, { scale: 0.97, duration: 0.1, ease: "power2.out" });
      const up = () => gsap.to(btn, { scale: 1.03, duration: 0.15, ease: "power2.out" });

      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      btn.addEventListener("mousedown", down);
      btn.addEventListener("mouseup", up);
      btn.addEventListener("focus", enter);
      btn.addEventListener("blur", leave);

      return { btn, enter, leave, down, up };
    });

    return () => {
      listeners.forEach(({ btn, enter, leave, down, up }) => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
        btn.removeEventListener("mousedown", down);
        btn.removeEventListener("mouseup", up);
        btn.removeEventListener("focus", enter);
        btn.removeEventListener("blur", leave);
      });
    };
  }, { scope: mainRef });
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.012,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      rotate: 4,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 110,
      }
    },
  };


  return (
    <>
      {/* Navigation Header */}
      <Header />

      <main ref={mainRef} className="flex-1 w-full bg-white">
        
        {/* HERO SECTION */}
        <section className="border-b border-gray-200 min-h-[90vh] flex flex-col justify-between bg-white pt-20">
          <div className="max-w-7xl mx-auto w-full border-x border-gray-200 flex-1 grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
              
              {/* Technical Indicator */}
              <div className="inline-flex flex-col gap-1 mb-8 overflow-hidden section-header-group">
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#00319A]" />
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#00319A] uppercase font-jakarta">
                    01 / PRODUCT DESIGN PORTFOLIO 2026
                  </span>
                </div>
                <div className="h-[1px] bg-[#00319A]/30 w-full section-divider origin-left" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-jakarta tracking-tight leading-[1.2] text-gray-900 uppercase max-w-4xl w-full terminal-cursor">
                {"ESTÉTICA FUNCIONAL Y".split(" ").map((word, index) => (
                  <span key={`char-1-${index}`} className="hero-word inline-block mr-[0.25em]">
                    {word}
                  </span>
                ))}
                {" "}
                <span className="text-[#00319A] inline-block mr-[0.25em]">
                  {"NARRATIVAS VISUALES".split(" ").map((word, index) => (
                    <span key={`char-2-${index}`} className="hero-word inline-block mr-[0.25em]">
                      {word}
                    </span>
                  ))}
                </span>
                {" "}
                {"QUE TRANSFORMAN NEGOCIOS.".split(" ").map((word, index) => (
                  <span key={`char-3-${index}`} className="hero-word inline-block mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </h1>

              {/* Sub-headline */}
              <p className="text-sm md:text-base font-light text-gray-muted max-w-2xl leading-relaxed mt-8">
                Diseñamos el punto de contacto entre tu marca y su audiencia. Desde identidades gourmet e inmobiliarias hasta experiencias digitales de alto rendimiento.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-12 w-full sm:w-auto">
                <button
                  onClick={() => handleScrollTo("portafolio")}
                  className="hero-btn relative overflow-visible px-8 py-4 text-xs font-bold uppercase tracking-widest border border-gray-900 text-gray-dark hover:text-[#00319A] hover:border-[#00319A] transition-all duration-300 rounded-none cursor-pointer group"
                >
                  <motion.span 
                    className="absolute -inset-0.5 border border-gray-300 pointer-events-none rounded-none opacity-0"
                    whileHover={{ 
                      scale: [1, 1.15],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0.1
                    }}
                  />
                  Ver Portafolio
                </button>
                
                <button
                  onClick={() => handleScrollTo("contacto")}
                  className="hero-btn group relative overflow-visible px-8 py-4 text-xs font-black uppercase tracking-widest bg-[#00319A] hover:bg-[#00226b] text-white transition-all duration-300 rounded-none flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <motion.span 
                    className="absolute -inset-0.5 border border-[#00319A] pointer-events-none rounded-none opacity-0"
                    whileHover={{ 
                      scale: [1, 1.15],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0.1
                    }}
                  />
                  Iniciar Proyecto
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Spacer & Technical Column with Tetris animation background */}
            <div className="lg:col-span-4 h-full">
              <TetrisBrutalista />
            </div>

          </div>
        </section>


        {/* SERVICES SECTION */}
        <Servicios />


        {/* REELS SHOWCASE */}
        <ReelsMovimiento />

        {/* METRICS & TESTIMONIALS SECTION */}
        <Resultados />



        {/* INTERNATIONAL MARKET SECTION */}
        <section id="mercado" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Boxed outline layout */}
            <div className="border border-gray-200 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50/30">
              
              {/* Coordinates panel */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8 flex flex-col gap-4 section-header-group">
                <span className="text-xs font-bold tracking-[0.25em] text-[#00319A] uppercase block font-jakarta">
                  06 / ENFOQUE BINACIONAL
                </span>
                <div className="h-[1px] bg-[#00319A] w-full section-divider origin-left" />
                <div className="text-xs font-mono text-gray-muted uppercase tracking-wider leading-relaxed">
                  Reynosa, MX: 26.0908° N, 98.2778° W
                  <br />
                  McAllen, US: 26.2034° N, 98.2300° W
                </div>
              </div>

              {/* Copy panel */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00319A]/5 border border-[#00319A]/20 mb-4 rounded-none">
                  <Globe2 className="w-3.5 h-3.5 text-[#00319A]" />
                  <span className="text-[10px] font-bold tracking-widest text-[#00319A] uppercase">
                    Mercado Binacional
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-jakarta tracking-tighter leading-none text-gray-dark uppercase mb-6">
                  Diseño sin fronteras.
                </h2>
                <p className="text-base md:text-lg font-light text-gray-muted leading-relaxed">
                  Conectamos marcas en el mercado internacional, adaptando la narrativa visual para audiencias bilingües con un impacto comercial directo.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* LEAD CAPTURE FORM */}
        <FormularioPasos />

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto border-x border-gray-200">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-gray-200 border-b border-gray-200">
            
            {/* Info Col */}
            <div className="md:col-span-5 bg-white p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
              <div>
                <a href="#" className="text-xl font-black tracking-[0.2em] font-jakarta text-gray-dark block mb-4 uppercase">
                  SHRK<span className="text-[#00319A]">.</span>
                </a>
                <p className="text-xs font-light text-gray-muted max-w-sm leading-relaxed">
                  Estudio boutique de diseño de producto, branding gourmet y desarrollo digital. Activos visuales de alto rendimiento en el mercado binacional.
                </p>
              </div>

              {/* Social links - rectangular icons */}
              <div className="flex items-center gap-2 mt-8">
                {[
                  { href: "https://instagram.com", label: "Instagram", icon: "IG" },
                  { href: "https://linkedin.com", label: "LinkedIn", icon: "LN" },
                  { href: "https://dribbble.com", label: "Dribbble", icon: "DB" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-muted hover:text-white hover:bg-[#00319A] hover:border-[#00319A] transition-all duration-200 rounded-none"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links Col */}
            <div className="md:col-span-3 bg-white p-8 md:p-12 min-h-[250px]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00319A] mb-6 font-jakarta">Explorar</h4>
              <ul className="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider text-gray-muted">
                <li>
                  <a href="#servicios" onClick={(e) => { e.preventDefault(); handleScrollTo("servicios"); }} className="hover:text-[#00319A] transition-colors duration-200">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#portafolio" onClick={(e) => { e.preventDefault(); handleScrollTo("portafolio"); }} className="hover:text-[#00319A] transition-colors duration-200">
                    Portafolio
                  </a>
                </li>
                <li>
                  <a href="#mercado" onClick={(e) => { e.preventDefault(); handleScrollTo("mercado"); }} className="hover:text-[#00319A] transition-colors duration-200">
                    Mercado
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info Col */}
            <div className="md:col-span-4 bg-white p-8 md:p-12 min-h-[250px]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00319A] mb-6 font-jakarta">Oficina Binacional</h4>
              <p className="text-xs text-gray-muted leading-relaxed font-bold">
                Reynosa, Tamaulipas, México / McAllen, Texas, USA
              </p>
              <a 
                href="mailto:hello@shrkstudio.com" 
                className="text-xs font-black uppercase text-gray-dark hover:text-[#00319A] transition-colors duration-200 block mt-3"
              >
                hello@shrkstudio.com
              </a>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white text-[10px] text-gray-muted tracking-widest font-mono">
            <span>SHRKSTUDIO.COM</span>
            <span className="italic">"Cada gran proyecto comienza con una visión clara."</span>
            <span>&copy; 2026 SHRK Media Studio.</span>
          </div>

        </div>
      </footer>
    </>
  );
}
